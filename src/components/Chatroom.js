import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase';
import marked from 'marked'
class Chatroom extends Component {
    constructor(){
        super()
        this.updateMessage = this.updateMessage.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.loginMessage = this.loginMessage.bind(this)
        this.logoutMessage = this.logoutMessage.bind(this)
        this.loadFile = this.loadFile.bind(this)
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
            //const reader = new FileReader();
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
                            // supdate input with blod url
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    this.setState({
                                        message: "![prout](" + downloadURL + ")"
                                    })
                                    console.log(downloadURL)
                                    this.submitMessage()
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
                <li key={item.ts}>
                    {item.ts} : {item.displayName}
                    <div dangerouslySetInnerHTML={{ __html: item.message }} />
                </li>
            )
        })
        return (
            <div>
                <button onClick={this.loginMessage}>login</button>
                { (this.state.user) ? <button onClick={this.logoutMessage}>logout</button> : '' }
                <ul>
                    {currentMessage}
                </ul>
                <canvas ref="canvas" />
                <form onSubmit={this.submitMessage}>
                    <input type="file" ref="fileInput" onChange={this.loadFile}/>
                    <input onChange={this.updateMessage} type="text" placeholder="Message"/>
                    <br/>
                    <button type="submit" value="submit">Submit Message</button>
                </form>
            </div>
        );
    }
}

export default Chatroom;

