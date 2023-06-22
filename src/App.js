import AvailablePosts from "./components/AvailablePosts";
import NightSwitch from "./HOC/NightSwich";
import {useEffect, useState} from "react";
import classes from "./App.module.css"

const App = () => {
    const [nightMode, setNightMode] = useState(false);

    useEffect(() => {
        if (nightMode) {
            document.body.classList.add(classes.nightMode);
        } else {
            document.body.classList.remove(classes.nightMode);
        }
    }, [nightMode]);

    const nightModeHandler = (newMode) => {
        setNightMode(newMode);
    };


    return (
        <div>
            <NightSwitch nightMode={nightMode} onClick={nightModeHandler} />
            <AvailablePosts />
        </div>
    );
};

export default App;
