// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './dashboard'; // Assuming this is the correct import
import Newaddlist from './newaddlist';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard"> {/* Set initial route to Dashboard */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddExpenses" component={Newaddlist} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
