import React from 'react';
import './Room.scss';
import InputActionable from '../InputActionable/InputActionable';
import Button from '../Button/Button';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonCopyText: 'COPY'
        }
        this.goToHome = this.goToHome.bind(this);
        this.copyRoomId = this.copyRoomId.bind(this);
    }

    copyRoomId(id) {
        let elem = document.createElement('input');
        elem.value = id;
        elem.style.position="fixed";
        elem.style.top = '-100px';
        document.body.append(elem);
        elem.select()
        document.execCommand("copy");
        document.body.removeChild(elem);
        this.setState({ buttonCopyText: 'COPIED' })
        setTimeout(_ => this.setState({ buttonCopyText: 'COPY' }), 2000);
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
                        inputValue={ this.props.location.state.roomId }
                        isInputDisabled={ true }
                        onButtonClick={ this.copyRoomId }
                        buttonText={ this.state.buttonCopyText }/>
                    <div className="status-container">
                        <span className="text-white">
                            2 Users online
                        </span>
                    </div>
                    <Button 
                        text="GO BACK" 
                        onClick={this.goToHome}/>
                </div>
                <div className="editor-container">
                    <textarea name="" id="" rows="10"></textarea>
                </div>
            </div>
        );
    }
}

export default Room