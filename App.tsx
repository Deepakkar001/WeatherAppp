/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'
import { store, persistor } from './src/redux/store'
import SignupPage from './src/screens/SignupPage'
import LoginPage from './src/screens/LoginPage'
import HomePage from './src/screens/HomePage'
import Showresult from './src/screens/Showresult'
import Search from './src/screens/Search'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'HomePage' : 'LoginPage'}>
      <Stack.Screen name='LoginPage' component={LoginPage} options={{ title: 'Login Page', headerStyle: { backgroundColor: 'white' }, headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: 'Black' }, headerTitleAlign: 'center'} } />
      <Stack.Screen name='SignupPage' component={SignupPage} options={{ title: 'Signup Page', headerStyle: { backgroundColor: 'white' }, headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: 'Black' }, headerTitleAlign: 'center'} } />
      <Stack.Screen name='HomePage' component={HomePage} options={{ title: 'Home Page', headerStyle: { backgroundColor: 'white' }, headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: 'Black' }, headerTitleAlign: 'center'} } />
      <Stack.Screen name='Showresult' component={Showresult} options={{ title: 'Weather Result☁️☁️', headerStyle: { backgroundColor: 'white' }, headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: 'Black' }, headerTitleAlign: 'center'} }/>
      <Stack.Screen name='Search' component={Search} options={{ title: 'Weather☁️☁️', headerStyle: { backgroundColor: 'white' }, headerTitleStyle: { fontWeight: 'bold', fontSize: 30, color: 'Black' }, headerTitleAlign: 'center'} }/>
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Loading...</Text>
          </View>
        } 
        persistor={persistor}
      >
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
