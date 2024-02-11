import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './dashboard';
import AddExpenses from './newaddlist';
import Login from './loginexpenses';
import Signup from './signup';
import Forgetpassword from './forgetpassword';
import Food from './food';
import Medicine from './Medicine';
import Others from './Others';
import Shopping from './Shopping';

const Stack = createStackNavigator();

const commonHeaderOptions = {
  headerStyle: {
    height: 60,
    backgroundColor: '#333C4B',
  },
  headerTitleStyle: {
    color: 'white',
  },
  headerTintColor: 'white',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ ...commonHeaderOptions, headerLeft: null }}
        />

        <Stack.Screen
          name="AddExpenses"
          component={AddExpenses}
          options={{ ...commonHeaderOptions }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ ...commonHeaderOptions, headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ ...commonHeaderOptions, headerShown: false }}
        />

        <Stack.Screen
          name="Forgetpassword"
          component={Forgetpassword}
          options={commonHeaderOptions}
        />

        <Stack.Screen
          name="Food"
          component={Food}
          options={commonHeaderOptions}
        />

        <Stack.Screen
          name="Medicine"
          component={Medicine}
          options={commonHeaderOptions}
        />

        <Stack.Screen
          name="Shopping"
          component={Shopping}
          options={commonHeaderOptions}
        />

        <Stack.Screen
          name="Others"
          component={Others}
          options={commonHeaderOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
