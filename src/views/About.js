import React from 'react';
import * as firebase from "firebase";
import {Redirect} from "react-router-dom";

class About extends React.Component{
    constructor(){
        super()
        this.state = {
            user: ''
        }
    }
    componentDidMount() {
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
    get renderRedirect(){
        if (this.state.user === false){
            return <Redirect to='/' />
        }
    }
    render() {
        return(
            <div>
                {this.renderRedirect}
                <p>You're connected</p>
            </div>
        )
    }
}

export default About;