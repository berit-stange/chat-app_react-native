import React from 'react';
import { ImageBackground, View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import image from '../assets/images/BackgroundImage.png';
// import GlobalFont from 'react-native-global-font';

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            backgroundColor: '#757083',
        }
    }


    render() {
        return (

            <ImageBackground source={image} style={styles.image}>

                <View style={styles.top}>
                    <Text style={styles.title}>Chat App</Text>
                </View>
                {/* <KeyboardAvoidingView style={styles.box} behavior="height" enabled > */}
                <View style={styles.bottom}>
                    <TextInput
                        style={styles.yourName}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        placeholder='Type here...'
                    />
                    <View style={styles.colorWrapper}>
                        <Text style={styles.colorText}>Choose Background Color:</Text>

                        <View style={styles.colorBox}>
                            <TouchableOpacity
                                style={styles.backgroundColor1}
                                onPress={() => this.setState({ backgroundColor: '#090C08' })}
                            />
                            <TouchableOpacity
                                style={styles.backgroundColor2}
                                onPress={() => this.setState({ backgroundColor: '#474056' })}
                            />
                            <TouchableOpacity
                                style={styles.backgroundColor3}
                                onPress={() => this.setState({ backgroundColor: '#8A95A5' })}
                            />
                            <TouchableOpacity
                                style={styles.backgroundColor4}
                                onPress={() => this.setState({ backgroundColor: '#B9C6AE' })}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        title='Go to Chat'
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
                {/* </KeyboardAvoidingView > */}

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    top: {
        height: '40%',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 45,
        fontWeight: '700',
        textAlign: 'center',
        justifyContent: 'center',
    },
    // box: {
    //     backgroundColor: '#ffffff',
    //     justifyContent: 'space-around',
    //     height: '44%',
    //     width: '88%',
    //     alignSelf: 'center',
    //     padding: 10,
    // },
    //when adding the height of 44%, the container is affected by the keyboard at text input
    bottom: {
        backgroundColor: '#ffffff',
        width: '88%',
        alignSelf: 'center',
        padding: 10,
    },
    yourName: {
        alignSelf: 'center',
        height: 50,
        width: '88%',
        backgroundColor: '#fff',
        borderColor: '#757083',
        borderWidth: 1,
        borderRadius: 2,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        paddingLeft: 5,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#757083',
        height: 50,
        width: '88%',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    colorWrapper: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    colorText: {
        color: '#757083',
        fontSize: 16,
        padding: 10,
    },
    colorBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    backgroundColor1: {
        backgroundColor: '#090C08',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    backgroundColor2: {
        backgroundColor: '#474056',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    backgroundColor3: {
        backgroundColor: '#8A95A5',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    backgroundColor4: {
        backgroundColor: '#B9C6AE',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
});