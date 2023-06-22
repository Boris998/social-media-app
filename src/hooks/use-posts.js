import {useEffect, useReducer} from "react";

const url = 'https://social-media-app-754ce-default-rtdb.europe-west1.firebasedatabase.app/profiles.json';
const now = new Date();

const calcTimeDiff = (now, postDate) => {
    const timeDiff = now - postDate;

    const msToMin = 60 * 1000;
    const msToHours = 60 * msToMin;
    const msToDays = 60 * msToHours;
    const msToWeeks = 7 * msToDays;

    return timeDiff < msToMin ?
        Math.floor(timeDiff / msToMin) + 'm'
        : timeDiff < msToHours ?
            Math.floor(timeDiff / msToHours) + 'h'
            : timeDiff < msToDays ?
                Math.floor(timeDiff / msToDays) + 'd'
                : Math.floor(timeDiff / msToWeeks) + 'w';
}

const initialInputState = {
    posts: [],
    isLoading: true,
    startIndexOfLoadedPosts: 0,
    hasMorePosts: true,
    totalPosts: 0,
}

const inputStateReducer = (state, action) => {
    if (action.type === 'FETCH_POSTS_SUCCESS') {
        const loadedPosts = action.payload;
        const hasMorePosts = loadedPosts.length >= 2;
        return {
            ...state,
            posts: [...state.posts, ...loadedPosts],
            isLoading: false,
            totalPosts: loadedPosts.length,
            hasMorePosts
        }
    }
    if (action.type === 'FETCH_POSTS_FAILURE') {
        return {...state, isLoading: false};
    }
    if (action.type === 'FETCH_MORE_POSTS') {
        const remainingPosts = state.totalPosts - state.startIndexOfLoadedPosts;
        const nextPostsCount = Math.min(2, remainingPosts);
        const hasMorePostsAfterFetch = remainingPosts > nextPostsCount;
        return {
            ...state,
            startIndexOfLoadedPosts: state.startIndexOfLoadedPosts + nextPostsCount,
            hasMorePostsAfterFetch: hasMorePostsAfterFetch
        };
    }
    return state;
}

const usePosts = () => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(url);

                if (!res.ok) return new Error('sth went wrong');

                const resData = await res.json();

                const loadedPosts = [];

                for (const key in resData) {
                    const postDate = new Date(resData[key].date.slice(0, 10));
                    const someTimeAgo = calcTimeDiff(now, postDate);

                    loadedPosts.push({
                        id: key,
                        image: resData[key].image,
                        caption: resData[key].caption,
                        type: resData[key].type,
                        source_type: resData[key].source_type,
                        source_link: resData[key].source_link,
                        date: someTimeAgo,
                        likes: resData[key].likes,
                        name: resData[key].name,
                        profile_image: resData[key].profile_image,
                    });
                }

                dispatch({type: 'FETCH_POSTS_SUCCESS', payload: loadedPosts});

            } catch
                (e) {
                dispatch({type: "FETCH_POSTS_FAILURE", payload: e.message});
            }
        }

        fetchPosts();
    }, []);

    const handleFetchMorePosts = () => {
        dispatch({type: "FETCH_MORE_POSTS"});
    }

    return {...inputState, dispatch, handleFetchMorePosts};
}

export default usePosts;