# Chat App
Chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

![MChat App](img/chat-app-emulator.gif)


## Features and Requirements
Users can enter their name and choose a background color for the chat screen before joining the chat

### User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

### Key Features
- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.

### Technical Requirements
- The app must be written in React Native.
- The app must be developed using Expo.
-The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
Page 2
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.



## Tech Stack
- React Native
- Expo
- Gifted Chat library (chat screen and the chat functionality)
- Firebase (Authenticate users anonymously)
- Firestore Database (Store conversations)
- Store chats locally using asyncStorage


## The 5 Ws
1. Who — The users of the mobile chat app. These could be friends, family or other
students on this course. The codebase will be used by other developers working on
the product.
2. What — A native chat app built with React Native, as well as all the relevant
documentation.
3. When — Whenever users of the chat app want to communicate with each other.
4. Where — The app will be optimized for both Android and iOS devices.
Expo will be used for development of the app and Google Firestore to store the chat messages.
5. Why — Mobile chat apps are among the most commonly downloaded and used apps
in the world, so knowing how to build a chat app is an indispensable skill. The app
will demonstrate React Native development skills.


## Getting Started: Set Up
#### Setting Up Expo and  Development Environment
Install Node.js, and the Expo CLI in your terminal with this command:
`
npm install expo-cli --global
`
- download Expo app on device to run the app directly from the Expo app
- create Expo account: [Expo sign-up page](https://expo.io/signup)


##### Setting up an Emulator
- download and install [Android Studio](https://docs.expo.io/versions/v32.0.0/workflow/android-studio-emulator/ "Android Studio")
- follow the on-screen installation instructions


#### Dependencies
 `npm i --save @react-native-community/async-storage @react-native-community/masked-view @react-native-community/netinfo @react-navigation/native @react-navigation/stack babel-preset-env better-docs expo expo-font expo-image-picker expo-location expo-permissions expo-updates firebase fsevents prop-types react react-dom react-google-maps react-native react-native-gesture-handler react-native-gifted-chat react-native-keyboard-spacer react-native-maps react-native-parsed-text react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg react-native-web react-native-web-maps react-navigaion react-navigation-stack`

Install all dependencies:
```
npm install
```

## Setting up Firebase
Set up firebase account: [Firebase](https://firebase.google.com)

Initialize Firebase in app within constructor():
 ```sh
constructor() {
    super();
    this.state = {
        messages: []
    };
    if (!firebase.apps.length) {
        firebase.initializeApp({
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_AUTH_DOMAIN',
        databaseURL: 'YOUR_DATABASE_URL',
        projectID: 'YOUR_PROJ_ID',
        storageBucket: 'YOUR_BUCKET',
        messagingSenderId: 'YOUR_SENDER_ID',
        appId: 'YOUR_APP_ID',
        measurementID: 'YOUR_MEASUREMENT_ID'
        })
    }
    
    // refers to messages collection in firebase DB
    this.referenceMessages = firebase.firestore().collection('messages');
}
```

#### Starting the App
Navigate to trepository in your terminal and type:
`expo start`