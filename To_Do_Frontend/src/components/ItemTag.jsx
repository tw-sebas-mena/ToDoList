import React from "react";

const itemTag = ({
    text,
    colorCode = 'red',
}) => {

    const tagStyle = {
        'font-size': '13px',
        'border': '1px solid gray',
        'border-radius': '5px',
        'padding': '0 2px',
        'backgroundColor': colorCode,
    };

    return (
        <span style={tagStyle}> {text} </span>
    );
};

export default itemTag;
