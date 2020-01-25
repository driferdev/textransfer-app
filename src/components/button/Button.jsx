import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import RouterContext from '../../contexts/RouterContext';

class Button extends React.Component {
    
    static contextType = RouterContext;

    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
         return (
            <button 
                className="main-btn"
                onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button