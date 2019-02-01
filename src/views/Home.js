import React, { Component } from 'react';
import '../App.css';
import Chatroom from '../components/Chatroom'

class Home extends Component {
    render() {
        return (
            <div>
                This is a Chatroom
                <Chatroom/>
            </div>
        );
    }
}

export default Home;

