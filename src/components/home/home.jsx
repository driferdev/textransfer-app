import React from 'react';
import './Home.scss';
import Button from '../Button/Button';
import InputActionable from '../InputActionable/InputActionable';
import RouterContext from '../../contexts/RouterContext';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.goToRoomPage = this.goToRoomPage.bind(this);
    }

    goToRoomPage() {
        this.props.history.push('room')
    }

    render() {
        let context = { router: this.props.history }
        return (
                <div className="main-container">
                    <div className="description">
                        <p className="text-white">
                        Share text between devices instantly with Cliper
                        </p>
                    </div>
                    <RouterContext.Provider value={context}>
                        <Button text="NEW ROOM" onClick={this.goToRoomPage}/>
                        <div className="space"></div>
                        <InputActionable 
                            inputType="number" 
                            placeholder="Room ID"
                            onButtonClick={this.goToRoomPage}
                            buttonText="GO"/>
                    </RouterContext.Provider>
                </div>
        );
    }
}

export default Home