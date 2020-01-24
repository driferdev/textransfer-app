import React from 'react';
import './button.css';

class Button extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        const { text } = this.props;

         return (
            <button className="main-btn">
                {text}
            </button>
        );
    }
}

export default Button