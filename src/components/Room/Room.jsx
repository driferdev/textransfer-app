import React from 'react';
import './Room.scss';
import InputActionable from '../InputActionable/InputActionable';
import Button from '../Button/Button';
import socketIOClient from "socket.io-client";

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonCopyText: 'COPY',
            text: '',
            totalUsers: 1,
        }
        this.goToHome = this.goToHome.bind(this);
        this.copyRoomId = this.copyRoomId.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.socket = socketIOClient(process.env.REACT_APP_WEB_SOCKET_URL);
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
        this.props.history.push('/');
    }

    componentDidMount() {
        let data = {
            roomName: this.props.location.state.roomId
        }
        this.socket.on("total", totalUsers => {
            this.setState({ totalUsers });
        });
        this.socket.on("update", text => {
            if(this.state.text !== text) {
                this.setState({ text });
            }
        });
        this.socket.emit('join', data);
    }

    componentWillUnmount() {
        let data = {
            roomName: this.props.location.state.roomId
        }
        this.socket.emit('leave', data);
    }

    onEditorChange(data) {
        let text = data.target.value;
        this.setState({ text });
        this.socket.emit('typing', { roomName: this.props.location.state.roomId, text });
    }

    render() {
        let total = this.state.totalUsers;
        let label = total === 1 ? 'Session' : 'Sessions';
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
                            { total } { label }
                        </span>
                    </div>
                    <Button 
                        text="GO BACK" 
                        onClick={this.goToHome}/>
                </div>
                <div className="editor-container">
                    <textarea
                        onChange={ this.onEditorChange }
                        value={ this.state.text }
                        name="" 
                        id="" 
                        rows="10"/>
                </div>
            </div>
        );
    }
}

export default Room