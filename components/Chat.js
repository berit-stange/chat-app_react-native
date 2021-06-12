import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {

    render() {
        // let name = this.props.route.params.name;
        // OR ...
        let { name, backgroundColor } = this.props.route.params;

        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor }}>
                <Text style={{ color: 'white', fontSize: 45 }}>
                    Hello there!
                </Text>
            </View>
        );
    };
}