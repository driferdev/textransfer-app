import React from 'react';
import PropTypes from 'prop-types';
import './InputActionable.scss';
import Button from '../Button/Button';

class InputActionable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div className="container">
                <input
                    type={ this.props.inputType }
                    defaultValue={ this.props.inputValue || '' }
                    disabled={ this.props.isInputDisabled || false }
                    onChange={ e => this.inputValue = e.target.value }
                    placeholder={ this.props.placeholder }/>
                <Button
                    text={ this.props.buttonText } 
                    onClick={ e => this.props.onButtonClick(this.inputValue || this.props.inputValue) }
                    loading={ this.props.loading }/>
            </div>
        );
    }
}

InputActionable.propTypes = {
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func,
    inputValue: PropTypes.string,
    isInputDisabled: PropTypes.bool,
};

export default InputActionable