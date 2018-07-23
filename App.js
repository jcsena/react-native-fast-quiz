
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import configureStore from './src/reducers';
import { AppNavigator, middleware } from './src/navigators/AppNavigator';

const store = configureStore();

const persistor = persistStore(store)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor} >
         <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;


