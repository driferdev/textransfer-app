import React, { useState } from 'react';
import './InputActionable.scss';
import Button from '../Button/Button';

const InputActionable = React.memo((props) => {
    const [ value, setValue ] = useState(props.inputValue);
    
    return (
        <div className="container">
            <input
                type={ props.inputType }
                defaultValue={ props.inputValue }
                disabled={ props.isInputDisabled || false }
                onChange={ e => setValue(e.target.value) }
                placeholder={ props.placeholder }/>
            <Button
                disabled= { props.btnDisabled || false }
                text={ props.buttonText } 
                onClick={ _ => props.onButtonClick(value) }
                loading={ props.loading }/>
        </div>
    );
});

export default InputActionable