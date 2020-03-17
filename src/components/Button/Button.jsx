import React from 'react';
import { css } from "@emotion/core";
import './Button.scss';
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
    @media only screen and (max-width: 420px){
        width: 9px;
        height: 9px;
    }
`;

const Button = React.memo((props) => {
    return (
        <button
            disabled={ props.disabled }
            className="main-btn"
            onClick={props.onClick}>
            <span>{props.text}</span>
            <ClipLoader
                css={ override }
                size={ 13 }
                color={ "white" }
                loading={ props.loading || false }
            />
        </button>
    )
});

export default Button;