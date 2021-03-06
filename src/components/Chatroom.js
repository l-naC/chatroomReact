import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase';
import marked from 'marked'
import StyledChatRoom from './style'
import {CSSTransition,TransitionGroup} from 'react-transition-group'

class Chatroom extends Component {
    constructor(){
        super()
        this.state = {
            user: false,
            messages: '',
            tabMessages: []
        }
    }

    componentDidMount() {
        console.log('componentDiMount')
        firebase.database().ref('messages/').on('value', (snapshot) => {
            let currentMessages = Object.values(snapshot.val())
            if (currentMessages != null){
                this.setState({
                    tabMessages: currentMessages
                })
            }
        })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                this.setState({
                    user: user
                })
            } else {
                // No user is signed in.
                this.setState({
                    user: false
                })
            }
        });
    }
    updateMessage(event){
        console.log('updateMessage: '+event.target.value)
        this.setState({
            messages: event.target.value
        })
    }
    submitMessage(event){
        console.log('submitMessage: '+this.state.messages)
        if (this.state.user){
            const nextMessage = {
                ts: new Date().getTime(),
                uid: this.state.user.uid,
                displayName: this.state.user.displayName,
                message: this.state.messages
            }
            firebase.database().ref('messages/').push(nextMessage)
        }
        event && event.preventDefault()
    }
    loginMessage(){
        let googleAuthProvider = new firebase.auth.GoogleAuthProvider()
        googleAuthProvider.addScope('https://www.googleapis.com/auth/plus.login')
        //firebase.auth().languageCode = 'fr'
        firebase.auth().signInWithPopup(googleAuthProvider)
    }
    logoutMessage(){
        firebase.auth().signOut()
    }
    loadFile(event){
        if(event.target.files[0]) {
            const file = event.target.files[0];
            // TODO : check si c'est une image
            let img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                let canvas = this.refs.canvas
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 200, 100)
                //canvas to blod convert
                canvas.toBlob(blob => {
                    // inject into storage then send msg
                    firebase.storage().ref('images/').child(file.name)
                        .put(blob)
                        .then(snapshot => {
                            // update input with blod url
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    this.setState({
                                        messages: "![prout](" + downloadURL + ")"
                                    })
                                    this.submitMessage()
                                    console.log("![prout](" + downloadURL + ")")
                                    // TODO : cleanup canvas && fileinput
                                });
                        })
                }, 'image/webp', 0.8)
            };
        }
    }
    get markedDown(){
        return (this.state.tabMessages).map((entry) => {
            return ({
                ts: entry.ts,
                uid: entry.uid,
                displayName: entry.displayName,
                message: (entry.message) ? marked((entry.message).toString(), {sanitize: true}) : ''
            })
        })
    }

    render() {
        const currentMessage = this.markedDown.map((item) => {
            return (
                <CSSTransition key={item.ts} timeout={4000} classNames="fade">
                    <li key={item.ts} className="message-screen">
                        <div className={item.displayName === this.state.user.displayName ? "my-message" : ''}>
                            <span className="message-sender">{item.displayName}</span>
                            <span className="message" dangerouslySetInnerHTML={{ __html: item.message }}/>
                        </div>
                    </li>
                </CSSTransition>
            )
        })
        return (
            < StyledChatRoom >
                <div id="message-log">
                    <button onClick={this.loginMessage.bind(this)}>login</button>
                    { (this.state.user) ? <button onClick={this.logoutMessage.bind(this)}>logout</button> : '' }
                </div>
                <div id="container-chat">
                    <TransitionGroup>
                        <ul>
                            {currentMessage}
                        </ul>
                    </TransitionGroup>
                </div>
                <div id="container-canvas">
                    <canvas ref="canvas"/>
                </div>
                <form onSubmit={this.submitMessage.bind(this)} id="message-chat">
                    <input type="file" ref="fileInput" onChange={this.loadFile.bind(this)}/>
                    <input onChange={this.updateMessage.bind(this)} type="text" placeholder="Message"/>
                    <br/>
                    <button type="submit" value="submit">Submit Message</button>
                </form>
            </StyledChatRoom>
        );
    }
}

export default Chatroom;

