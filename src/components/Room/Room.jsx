import React from 'react';
import './Room.scss';
import InputActionable from '../InputActionable/InputActionable';
import Button from '../Button/Button';
import socketIOClient from "socket.io-client";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { getRoom, handleSnackbar } from '../../actions';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const override = css`
    @media only screen and (max-width: 420px){
        width: 30px;
        height: 30px;
    }
`;

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
        this.getRoom = this.getRoom.bind(this);
        this.listenWebSocketEvents = this.listenWebSocketEvents.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.renderLoadingSpinner = this.renderLoadingSpinner.bind(this);
        this.renderSnackbar = this.renderSnackbar.bind(this);
        this.onCloseSnackbar = this.onCloseSnackbar.bind(this);
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

    getRoom(roomName) {
        this.props.getRoom(roomName);
    }

    goToHome() {
        this.props.history.push('/');
    }

    componentDidMount() {
        const roomName = this.props.match.params.name;
        this.getRoom(roomName);
    }

    listenWebSocketEvents(roomName) {
        let data = {
            roomName
        }
        this.socket.on("roomData", data => {
            this.setState({ totalUsers: data.totalUsers, text: data.text });
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
            roomName: this.props.match.params.name
        }
        this.socket.emit('leave', data);
    }

    onEditorChange(data) {
        let text = data.target.value;
        this.setState({ text });
        this.socket.emit('typing', { roomName: this.props.match.params.name, text });
    }

    renderEditor() {
        let total = this.state.totalUsers;
        let label = total === 1 ? 'Session' : 'Sessions';
        return (
            <div className="wrapper">
                <div className="actions-container">
                    <InputActionable 
                        inputType="number" 
                        inputValue={ this.props.match.params.name }
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
                        rows="10"/>0
                </div>
            </div>
        );
    }
    
    renderLoadingSpinner() {
        return (
            <div className="loader-box">
                <ClipLoader
                    css={ override }
                    size={ 80 }
                    color={ "white" }
                    loading={ true }
                />
            </div>
        );
    }

    onCloseSnackbar() {
        console.log('click')
        this.props.handleSnackbar('HIDE_SNACKBAR', '');
    }

    renderSnackbar() {
        console.log(this.props)
        let options = this.props.snackbar;

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={ options.show } 
                autoHideDuration={ 6000 }
                onClose={ this.onCloseSnackbar } 
                >
                <Alert 
                    onClose={ this.onCloseSnackbar }
                    severity={ options.severity }
                    >
                    { options.message }
                </Alert>
            </Snackbar>
        );
    }

    render() {
        let html = this.renderLoadingSpinner();
        if(this.props.room.id != null) {
            html = this.renderEditor();
        }else if (!this.props.room.id) {
            // TODO se esta ejecutando aun cuando la sala existe
            setTimeout(() => {
                this.goToHome();
            }, 3000);
        }
        return (
            <div className="room-container">
                { html }
                { this.renderSnackbar() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        room: state.room,
        getRoomSpinner: state.getRoomSpinner,
        snackbar: state.snackBar,
    }
}

export default connect(mapStateToProps, { getRoom, handleSnackbar })(Room)