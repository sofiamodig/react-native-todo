import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import AddTodo from './screens/AddTodo';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'My todos',
          headerStyle: {
            backgroundColor: '#557da5',
          },
          headerTitleStyle: {
            fontSize: 18,
          },
          headerTintColor: '#fff',
        }}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AddTodo"
          component={AddTodo}
          options={{
            title: 'Add new todo',
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#557da5',
            },
            headerTitleStyle: {
              fontSize: 18,
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
