import PostItem from "./PostItem";
import {Button, Grid} from "@mui/material";
import usePosts from "../hooks/use-posts";


const AvailablePosts = () => {
    const { isLoading, posts, startIndexOfLoadedPosts, hasMorePosts, handleFetchMorePosts} = usePosts();
    const visiblePosts = posts.slice(0, startIndexOfLoadedPosts + 2);


    const postList = visiblePosts.map(post =>
        <PostItem
            key={post.id}
            image={post.image}
            caption={post.caption}
            type={post.type}
            source_type={post.source_type}
            source_link={post.source_link}
            date={post.date}
            likes={post.likes}
            name={post.name}
            profile_image={post.profile_image}
        />
    );


    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            sx={{marginTop: '50px'}}
        >
            {isLoading ? 'Loading...' : postList}
            <Button onClick={handleFetchMorePosts} disabled={!hasMorePosts}>Fetch More</Button>
        </Grid>
    );
}

export default AvailablePosts;
