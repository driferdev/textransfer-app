import React from 'react';
import { css } from "@emotion/core";
import PropTypes from 'prop-types';
import './Button.scss';
import RouterContext from '../../contexts/RouterContext';
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
    @media only screen and (max-width: 420px){
        width: 9px;
        height: 9px;
    }
`;

class Button extends React.Component {
    
    static contextType = RouterContext;

    render() {
         return (
            <button
                className="main-btn"
                onClick={this.props.onClick}>
                <span>{this.props.text}</span>
                <ClipLoader
                    css={ override }
                    size={ 13 }
                    color={ "white" }
                    loading={ this.props.loading || false }
                />
            </button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button