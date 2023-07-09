import React, { useState, useEffect } from 'react'

// let interval = null;
function TopBarLoader() {
    let [width, setWidth] = useState(25 + Math.floor(Math.random() * 25));

    useEffect(() => {
        if (document.getElementById("topLoadingBarComplete") !== null) {
            document.getElementById("topLoadingBarComplete").style.width = "0";
            document.getElementById("topLoadingBarComplete").style.opacity = "100%";
        }

        const intervalId = setInterval(() => {
            if (width <= 85) {
                setWidth(width += Math.floor((Math.random() * 10) + 1))
            }
        }, 50);

        return () => {
            clearInterval(intervalId);
        };
    }, [])

    return (
        <div id="topLoadingBar" className="top-loading-bar" style={{ width: `${width}%` }}></div>
    )
}

export default TopBarLoader