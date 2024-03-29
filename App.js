import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler'; // import react native gesture handler
import { NavigationContainer } from '@react-navigation/native'; // import react Navigation
import { createStackNavigator } from '@react-navigation/stack';
// import CustomActions from './components/CustomActions';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {

  //create the circle button
  // renderCustomActions = (props) => {
  //   return <CustomActions {...props} />;
  // };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

