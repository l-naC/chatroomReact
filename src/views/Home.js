import React, { Component } from 'react';
import '../App.css';
import Chatroom from '../components/Chatroom'
import '../components/style'

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

