import React from 'react';
import './Home.scss';
import Button from '../Button/Button';
import InputActionable from '../InputActionable/InputActionable';
import { connect } from 'react-redux';
import { goToRoom, newRoom } from '../../actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.newRoom = this.newRoom.bind(this);
    }

    newRoom() {
        this.props.newRoom(this.props.history)
    }

    render() {
        return (
            <div className="main-container">
                <div className="description">
                    <p className="text-white">
                        Share text between devices instantly with Cliper
                    </p>
                </div>
                <Button text="NEW ROOM"
                    onClick={ this.newRoom }
                    loading={ this.props.newRoomSpinner }/>
                <div className="space"></div>
                <InputActionable
                    inputType="number"
                    placeholder="Room ID"
                    loading={ this.props.goRoomSpinner }
                    onButtonClick={ (id) => this.props.goToRoom(id, this.props.history) }
                    buttonText="GO"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        room: state.newRoom,
        toRoom: state.goToRoom,
        newRoomSpinner: state.newRoomSpinner,
        goRoomSpinner: state.goRoomSpinner,
    }
}

export default connect(mapStateToProps, { newRoom, goToRoom })(Home)