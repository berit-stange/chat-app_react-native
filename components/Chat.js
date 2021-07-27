import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
// import AsyncStorage from '@react-native-community/async-storage'; //data is stored on device - persistent key-value storage mechanism to store strings
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo'; //is user on- or offline? 

// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';

import MapView from 'react-native-maps';
// import { MapView } from 'expo';
import CustomActions from './CustomActions';


export default class Chat extends React.Component {
    //state initialization within the constructor
    constructor() {
        super();

        this.state = {
            messages: [],
            uid: 0,
            // _id: 0,
            user: {
                _id: '',
                name: '',
                // avatar: '',
            },
            image: null,
            isConnected: false,
        };
        if (!firebase.apps.length) {
            // initialize connection to Firebase DB
            firebase.initializeApp({
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


    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        //go through each document:
        querySnapshot.forEach((doc) => {
            //get the QueryDocumentSnapshot's data:
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                // uid: this.state.uid,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    // avatar: data.user.avatar,
                },
                image: data.image,
                location: data.location
            });
        });
        this.setState({
            messages,
        });
    };

    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({ // add() = firestore method, save object to firestore
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text || '',
            uid: this.state.uid,
            user: message.user,
            image: message.image || null,
            // image: 'https://facebook.github.io/react-native/img/header_logo.png',
            location: message.location || null,
            // location: {
            //     latitude: 48.864601,
            //     longitude: 2.398704,
            // },
        })
    }

    handleConnectivityChange = (state) => {
        const isConnected = state.isConnected;
        if (isConnected == true) {
            this.setState({
                isConnected: true,
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        } else {
            this.setState({
                isConnected: false,
            });
        }
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    };

    // saveMessages = async () => {
    //     try {
    //       await AsyncStorage.setItem(
    //         "messages",
    //         JSON.stringify(this.state.messages)
    //       );
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };

    async getMessages() { //async await
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages),
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    // getMessages = async () => {
    //     let messages = "";
    //     try {
    //       messages = (await AsyncStorage.getItem("messages")) || [];
    //       this.setState({
    //         messages: JSON.parse(messages),
    //       });
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    };

    // deleteMessages = async () => {
    //     try {
    //         await AsyncStorage.removeItem("messages");
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

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
                this.saveMessages();
            }
        );
    }

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
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

    // pickImage function
    // pickImage = async () => {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    //     if (status === 'granted') {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: 'Images',
    //             // mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             // mediaTypes: "All",
    //         }).catch(error => console.log(error));

    //         if (!result.cancelled) {
    //             this.setState({
    //                 image: result
    //             });
    //         }
    //     }
    // }

    // takePhoto = async () => {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    //     if (status === 'granted') {
    //         let result = await ImagePicker.launchCameraAsync()
    //             .catch(error => console.log(error));

    //         if (!result.cancelled) {
    //             this.setState({
    //                 image: result
    //             });
    //         }
    //     }
    // }

    // getLocation = async () => {
    //     const { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status === 'granted') {
    //         let result = await Location.getCurrentPositionAsync({})
    //             .catch(error => console.log(error));

    //         if (result) {
    //             this.setState({
    //                 location: result
    //             });
    //         }
    //     }
    // }

    componentDidMount() {
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');
                this.authUnsubscribe = firebase.auth()
                    .onAuthStateChanged(async (user) => {
                        if (!user) {
                            await firebase.auth().signInAnonymously();
                        }

                        this.setState({
                            // isConnected: true,
                            uid: user.uid,
                            messages: [],
                            // messages: [
                            //     {
                            //         image: 'https://facebook.github.io/react-native/img/header_logo.png',
                            //         location: {
                            //             latitude: 48.864601,
                            //             longitude: 2.398704,
                            //         },
                            //     }
                            // ],
                            user: {
                                _id: user.uid,
                                name: this.props.route.params.name,
                                // avatar: null,
                            },
                            // image: 'https://facebook.github.io/react-native/img/header_logo.png',
                            // location: {
                            //     latitude: 48.864601,
                            //     longitude: 2.398704,
                            // },
                        });
                        // this.referenceChatMessages = firebase.firestore().collection('messages');
                        //listen for updates in collection using Firestore’s onSnapshot() function
                        this.unsubscribe = this.referenceChatMessages
                            .orderBy('createdAt', 'desc')
                            .onSnapshot(this.onCollectionUpdate);
                    });
            } else {
                console.log('offline');
                this.setState({
                    isConnected: false
                });
                this.getMessages();
            }
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe(); //stop listening for changes
    }

    //create the circle button
    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };
    // renderCustomActions = (props) => <CustomActions {...props} />;

    //render map view
    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }


    render() {
        // let name = this.props.route.params.name;  ....OR: 
        let { name, backgroundColor } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        return (
            //rendering chat interface
            //Gifted Chat provides its own component, comes with its own props
            //provide GiftedChat with custom messages, information, function etc.
            //fullscreen component
            <View style={{ flex: 1, backgroundColor: backgroundColor }} >

                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    // renderBubble={this.renderBubble}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    // renderInputToolbar={this.renderInputToolbar}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    isConnected={this.state.isConnected}
                    user={this.state.user}
                />
                {
                    Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
                }

            </View>
        );
    };
}