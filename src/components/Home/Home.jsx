import React, { useCallback, useEffect, useState } from 'react';
import './Home.scss';
import Button from '../Button/Button';
import InputActionable from '../InputActionable/InputActionable';
import { connect } from 'react-redux';
import { loadRoom, handleSnackbar, cleanSnackbar, showError } from '../../actions';
import Snackbar from '../Snackbar/Snackbar';
import socketIOClient from "socket.io-client";

const Home = (props) => {
    const history = props.history;
    const loadRoom =  props.loadRoom;
    const [ socket, setSocket ] = useState(null);
    const [ showSpinner, setShowSpinner ] = useState(false);
    const cleanSnackbar = props.cleanSnackbar;
    const showError = props.showError;

    const newRoom = useCallback(() => {
        setShowSpinner(true);
        socket.emit('generateRoom');
    }, [socket]);

    const onCloseSnackbar = useCallback(() => {
        cleanSnackbar();
    }, [cleanSnackbar]);

    const goToRoom = useCallback((id) => {
        history.push({
            pathname: '/room/'+id,
        });
    }, [history]);
    
    const isInputValid = (id) => {
        if(isNaN(id) || typeof +id !== 'number' || id === 0){
            return false;
        }
        return true;
    }
    const handleRoomNavigation= (id) => {
        id = +id;
        if(isInputValid(id)) {
            goToRoom(id);
        }
    }
    
    useEffect(() => {
        cleanSnackbar();
        setSocket(socketIOClient(process.env.REACT_APP_WEB_SOCKET_URL));
        return () => {
            setSocket(null);
        }
    }, [cleanSnackbar]);

    useEffect(() => {
        if(socket != null) {
            socket.on('connect_error', function() {
                showError('Sorry, there seems to be an issue with the connection!');
             });
        }
    }, [socket, showError]);

    useEffect(() => {
       if(socket != null) {
            socket.on('roomGenerated', roomName => {
                setShowSpinner(false);
                loadRoom(roomName);
                history.push({
                    pathname: `/room/${roomName}`,
                });
            });
       }
    }, [socket, loadRoom, history]);

    return (
        <div className="main-container">
            <div className="description">
                <p className="text-white">
                    Share text between devices instantly with TexTransfer
                </p>
            </div>
            <Button text="NEW ROOM"
                onClick={ newRoom }
                loading={ showSpinner }/>
            <div className="space"></div>
            <InputActionable
                inputType="number"
                placeholder="Room"
                onButtonClick={ handleRoomNavigation }
                buttonText="GO"/>
            <Snackbar
                open={ props.snackbar.show }
                onClose={ onCloseSnackbar }
                severity={ props.snackbar.severity }
                message={ props.snackbar.message }/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        newRoomSpinner: state.newRoomSpinner,
        goRoomSpinner: state.goRoomSpinner,
        snackbar: state.snackBar,
        room: state.room,
    }
}

export default connect(mapStateToProps, { loadRoom, handleSnackbar, cleanSnackbar, showError })(Home)