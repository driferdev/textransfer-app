import React from 'react';
import './home.css';
import Button from '../button/Button';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="main-container">
                <div className="description">
                    <p className="text-white">
                    Share text between devices instantly with Cliper
                    </p>
                </div>   
                <Button text="NEW ROOM"></Button>
                <div className="input-container">
                    <input type="number" className="room-input" placeholder="Room ID"/>
                    <Button text="GO"></Button>
                </div>
            </div>
        );
    }
}

export default Home