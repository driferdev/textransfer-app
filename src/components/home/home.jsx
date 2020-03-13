import React from 'react';
import './Home.scss';
import Button from '../Button/Button';
import InputActionable from '../InputActionable/InputActionable';
import { connect } from 'react-redux';
import { newRoom, handleSnackbar } from '../../actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.newRoom = this.newRoom.bind(this);
        this.onCloseSnackbar = this.onCloseSnackbar.bind(this);
        this.goToRoom = this.goToRoom.bind(this);
        this.handleRoomNavigation = this.handleRoomNavigation.bind(this);
    }

    newRoom() {
        this.props.newRoom(this.props.history)
    }

    onCloseSnackbar = () => {
        this.props.handleSnackbar('HIDE_SNACKBAR', '');
    }

    goToRoom(id) {
        this.props.history.push({
            pathname: '/room/'+id,
        });
    }
    
    isInputValid(id) {
        if(isNaN(id) || typeof +id !== 'number' || id === 0){
            return false;
        }
        return true;
    }
    
    handleRoomNavigation(id) {
        id = +id;
        if(this.isInputValid(id)) {
            this.goToRoom(id);
        }
    }
    
    render() {
        return (
            <div className="main-container">
                <div className="description">
                    <p className="text-white">
                        Share text between devices instantly with Clipbord
                    </p>
                </div>
                <Button text="NEW ROOM"
                    onClick={ this.newRoom }
                    loading={ this.props.newRoomSpinner }/>
                <div className="space"></div>
                <InputActionable
                    inputType="number"
                    placeholder="Room"
                    onButtonClick={ this.handleRoomNavigation }
                    buttonText="GO"/>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={ this.props.snackbar.show }
                    autoHideDuration={ 3000 }
                    onClose={ this.onCloseSnackbar }
                    >
                    <Alert
                        onClose={ this.onCloseSnackbar } 
                        severity={ this.props.snackbar.severity }
                        >
                        { this.props.snackbar.message }
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newRoomSpinner: state.newRoomSpinner,
        goRoomSpinner: state.goRoomSpinner,
        snackbar: state.snackBar,
    }
}

export default connect(mapStateToProps, { newRoom, handleSnackbar })(Home)