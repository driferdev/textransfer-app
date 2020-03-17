import React, { useCallback } from 'react';
import './Home.scss';
import Button from '../Button/Button';
import InputActionable from '../InputActionable/InputActionable';
import { connect } from 'react-redux';
import { newRoom, handleSnackbar } from '../../actions';
import Snackbar from '../Snackbar/Snackbar';

const Home = (props) => {

    const newRoomProp = props.newRoom;
    const handleSnackBarProp = props.handleSnackbar;
    const history = props.history;
    
    const newRoom = useCallback(() => newRoomProp(history), [newRoomProp, history]);

    const onCloseSnackbar = useCallback(() => {
        handleSnackBarProp('HIDE_SNACKBAR', '')
    }, [handleSnackBarProp]);

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
    
    return (
        <div className="main-container">
            <div className="description">
                <p className="text-white">
                    Share text between devices instantly with TexTransfer
                </p>
            </div>
            <Button text="NEW ROOM"
                onClick={ newRoom }
                loading={ props.newRoomSpinner }/>
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
    }
}

export default connect(mapStateToProps, { newRoom, handleSnackbar })(Home)