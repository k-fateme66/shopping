import { useEffect } from "react";
import { useState } from "react";
import React from "react";

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {

    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src)
        }
    }, [src])
    return (
        <img
            src={imgSrc}
            {...props}
        />
    );
}

export default React.memo(ProgressiveImg);