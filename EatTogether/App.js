import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import RegistScreen from './src/screens/RegistScreen';
// import LoginScreen from './scr/screens/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Regist" component={RegistScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;