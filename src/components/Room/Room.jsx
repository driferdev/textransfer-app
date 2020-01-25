import React from 'react';
import './Room.scss';
import InputActionable from '../InputActionable/InputActionable';
import Button from '../Button/Button';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.goToHome = this.goToHome.bind(this);
    }

    copyRoomId() {

    }

    goToHome() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="room-container">
                <div className="actions-container">
                    <InputActionable 
                        inputType="number" 
                        inputValue="85455"
                        isInputDisabled={true}
                        onButtonClick={this.copyRoomId}
                        buttonText="COPY"/>
                    <div className="status-container">
                        <span className="text-white">
                            2 Users online
                        </span>
                    </div>
                    <Button text="GO BACK" onClick={this.goToHome}/>
                </div>
                <div className="editor-container">
                    <textarea name="" id="" rows="10"></textarea>
                </div>
            </div>
        );
    }
}

export default Room