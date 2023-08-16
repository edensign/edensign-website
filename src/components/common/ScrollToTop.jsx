import { useEffect } from "react";
import { useLocation } from "react-router";

// Implementing Custom Component for Scroll To Top
const ScrollToTop = (props) => {

    const location = useLocation();

    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return <>{props.children}</>

};

export default ScrollToTop;
