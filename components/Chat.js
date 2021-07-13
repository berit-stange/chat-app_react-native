import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
// import firestore from 'firebase';
import 'firebase/firestore';

//establish connection to Firestore
// const firebase = require('firebase');
// require('firebase/firestore');
// require('firebase/auth');

export default class Chat extends React.Component {
    //state initialization within the constructor
    constructor() {
        super();
        this.state = {
            //chat app needs to send, receive, and display messages 
            messages: [],
            _id: 0,
            user: {
                _id: '',
                name: '',
                avatar: '',
            }
        };
        if (!firebase.apps.length) {
            firebase.initializeApp({  // initialize connection to Firebase DB
                apiKey: "AIzaSyD3eu6uEe_p5pHeuVzQFPdWUJIb1BqXG1c",
                authDomain: "chat-app-d155e.firebaseapp.com",
                projectId: "chat-app-d155e",
                storageBucket: "chat-app-d155e.appspot.com",
                messagingSenderId: "197256413370",
                appId: "1:197256413370:web:81d18e3393107d68b6c283"
            });
        }
        // create a reference to “messages” collection
        this.referenceChatMessages = firebase.firestore().collection('messages');
    }


    componentDidMount() {
        this.referenceChatMessages = firebase.firestore().collection('messages');

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            this.setState({
                // uid: user.uid,
                messages: [],
                user: {
                    _id: '',
                    name: '',
                    avatar: null,
                },
                //messages must follow a certain format to work with the Gifted Chat library
                //more-detailed at “Message Object” section on the Gifted Chat repo
            });
            //listen for updates in collection using Firestore’s onSnapshot() function
            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
            // this.referenceChatMessagesUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe(); //stop listening for changes
    }

    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({ // add() = firestore method, save object to firestore
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text,
            // uid: '',
            user: message.user,
        })
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        //go through each document:
        querySnapshot.forEach((doc) => {
            //get the QueryDocumentSnapshot's data:
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                // user: data.user,
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });
        });
        this.setState({
            messages,
        });
    };



    onSend(messages = []) {
        // the function setState() is called with the parameter previousState > reference to the component’s state at the time the change is applied
        this.setState((previousState) => ({
            //append() function provided by GiftedChat, which appends the new message to the messages object
            // = message a user has just sent gets appended to the state messages so that it can be displayed in the chat
            messages: GiftedChat.append(previousState.messages, messages),
        }),
            // save previous chat log
            () => {
                this.addMessage();
            }
        );
    }



    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000',
                    },
                }}
            />
        )
    }

    render() {
        // let name = this.props.route.params.name;
        // OR: 
        let { name, backgroundColor } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        return (
            //rendering chat interface
            //Gifted Chat provides its own component, comes with its own props
            //provide GiftedChat with custom messages, information, function etc.

            <View
                style={{ flex: 1, backgroundColor: backgroundColor }}
            >

                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    // onSend={() => { this.addMessage(); }}
                    user={this.state.user}
                />
                {
                    Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
                }
            </View>
        );
    };
}

