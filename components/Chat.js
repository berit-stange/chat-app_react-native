import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    //state initialization within the constructor
    constructor() {
        super();
        this.state = {
            //chat app needs to send, receive, and display messages 
            messages: [],
        };
    }

    componentDidMount() {
        this.setState({
            //messages must follow a certain format to work with the Gifted Chat library
            //more-detailed at “Message Object” section on the Gifted Chat repo
            messages: [
                {
                    _id: 1,
                    text: 'Hello! This is a static message.',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    //appears above all other messages in the middle of the screen, without bubble
                    _id: 2,
                    text: 'Welcome to the chat!',
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    onSend(messages = []) {
        // the function setState() is called with the parameter previousState > reference to the component’s state at the time the change is applied
        this.setState(previousState => ({
            //append() function provided by GiftedChat, which appends the new message to the messages object
            // = message a user has just sent gets appended to the state messages so that it can be displayed in the chat
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
        // OR : 
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
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
                }
            </View>
        );
    };
}

