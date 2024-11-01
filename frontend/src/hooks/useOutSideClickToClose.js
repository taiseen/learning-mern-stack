import { useEffect } from "react";

const useOutSideClickToClose = (domRef, callback) => {

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (!domRef.current.contains(e.target)) {
                callback(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [domRef, callback])
}

export default useOutSideClickToClose