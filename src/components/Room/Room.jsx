import React, { useState, useEffect, useCallback } from 'react';
import './Room.scss';
import InputActionable from '../InputActionable/InputActionable';
import Button from '../Button/Button';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { getRoom, handleSnackbar, resetRoom } from '../../actions';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Snackbar from '../Snackbar/Snackbar';

const override = css`
    @media only screen and (max-width: 420px){
        width: 30px;
        height: 30px;
    }
`;
let timeoutCleanBtn;

const Room = (props) =>{

    const [ buttonCopyText, setButtonCopyText ] = useState('COPY');
    const [ text, setText ] = useState('');
    const [ totalUsers, setTotalUsers ] = useState(1);
    const [ socket, setSocket ] = useState(null);
    const [ tbnDisabled, setBtnDisabled ] = useState(false);

    const roomNameParam = +props.match.params.name;
    const roomName = props.room.id;
    const history = props.history;
    const getRoomProp =  props.getRoom;
    

    const goHome = useCallback(() => history.push('/'), [history]);
    const getRoom = useCallback((roomName) => getRoomProp(roomName), [getRoomProp]);
    const listenWebSocketEvents = useCallback(() => {
        socket.on("roomData", data => {
            setTotalUsers(data.totalUsers);
            setText(data.text);
        });
        socket.on("update", inComingText => {
            if(inComingText) {
                setText(inComingText);
            }
        });
        socket.emit('join', { roomName });
    }, [roomName, socket]);

    useEffect(() => {
        if(roomName != null) {
            setSocket(socketIOClient(process.env.REACT_APP_WEB_SOCKET_URL));
        }
        return () => {
            setSocket(null);
        }
    }, [roomName]);

    useEffect(() => {
        if(isNumber(roomNameParam) && roomName === null) {
            getRoom(roomNameParam)
        } else if(roomName === null) {
            goHome();
        }
    }, [roomName, roomNameParam, getRoom, goHome]);

    useEffect(() => {
        if(roomName != null && socket != null) {
            socket.connect();
            listenWebSocketEvents();
        }
        return () => {
            if(socket != null) {
                socket.disconnect();
                clearTimeout(timeoutCleanBtn);
            }
        }
    }, [roomName, listenWebSocketEvents, socket]);

    
    function copyRoomId(id) {
        setBtnDisabled(true);
        let elem = document.createElement('input');
        elem.value = id;
        elem.style.position="fixed";
        elem.style.top = '-100px';
        document.body.append(elem);
        elem.select()
        document.execCommand("copy");
        document.body.removeChild(elem);
        setButtonCopyText('COPIED');
        timeoutCleanBtn = setTimeout(() => {
            setButtonCopyText('COPY')
            setBtnDisabled(false);
        } , 2000);
    }

    function isNumber(id) {
        if(isNaN(id) || id <= 0) {
            return false;
        }
        return true;
    }

    function handleLeavingRoom() {
        socket.emit('leave', { roomName });
        props.resetRoom();
        goHome();
    }

    function onEditorChange(data) {
        let text = data.target.value;
        setText(text);
        socket.emit('typing', { roomName, text });
    }

    function renderEditor() {
        let total = totalUsers;
        let label = total === 1 ? 'Session' : 'Sessions';
        return (
            <div className="wrapper">
                <div className="actions-container">
                    <InputActionable 
                        inputType="number" 
                        inputValue={ props.match.params.name }
                        btnDisabled= { tbnDisabled }
                        isInputDisabled={ true }
                        onButtonClick={ copyRoomId }
                        buttonText={ buttonCopyText }/>
                    <div className="status-container">
                        <span className="text-white">
                            { total } { label }
                        </span>
                    </div>
                    <Button 
                        text="GO BACK" 
                        onClick={ handleLeavingRoom }/>
                </div>
                <div className="editor-container">
                    <textarea
                        onChange={ onEditorChange }
                        value={ text }
                        name="" 
                        id="" 
                        rows="10"/>0
                </div>
            </div>
        );
    }
    
    function renderLoadingSpinner() {
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

    function onCloseSnackbar() {
        props.handleSnackbar('HIDE_SNACKBAR', '');
        goHome();
    }

    function renderSnackbar() {
        let options = props.snackbar;
        return (
            <Snackbar
                open={options.show}
                onClose={ onCloseSnackbar }
                severity={ options.severity }
                message={ options.message }/>
        );
    }

    function handleRendering() {
        let html = renderLoadingSpinner();
        if(props.room.id != null) {
            html = renderEditor();
        }
        return html;
    }

    let html = handleRendering();

    return (
        <div className="room-container">
            { html }
            { renderSnackbar() }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        room: state.room,
        getRoomSpinner: state.getRoomSpinner,
        snackbar: state.snackBar,
    }
}

export default connect(mapStateToProps, { getRoom, handleSnackbar, resetRoom })(Room)