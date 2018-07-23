import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import thunk from 'redux-thunk';
import { Image } from 'react-native';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import MainScreen from '../components/MainScreen';
import FastQuiz from '../components/screen/FastQuiz';
import QuizDetail from '../components/screen/QuizDetail';
import Questions from '../components/screen/Questions';
import Settings from '../components/screen/Settings';


const logger = require('redux-logger').createLogger(); 

let middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
  thunk,
  logger
);


const MainNavigator = createStackNavigator({
  Main: { screen: MainScreen },
  FastQuiz: { screen: FastQuiz },
  QuizDetail: { screen: QuizDetail}
});

const SettingNavigator = createStackNavigator({
  Settings: { screen: Settings}
});

const QuestionsNavigator = createStackNavigator({
  Questions: { screen: Questions}
});


const RootNavigator = createBottomTabNavigator({
    Main: MainNavigator,
    Questions: QuestionsNavigator,
    Settings: SettingNavigator,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Main') {
        if(focused){
          return <Image style={{height: 28, width: 33 }} source={require('../img/aircraft.png')} />
        }
        return <Image style={{height: 28, width: 33 }} source={require('../img/aircraft-white.png')} />
      } else if (routeName === 'Questions') {
        if(focused){
          return <Image style={{height: 28, width: 17 }} source={require('../img/q.png')} />
        }
        return <Image style={{height: 28, width: 17 }} source={require('../img/q-white.png')} />
      } 
        if(focused) {
          return <Image style={{ height: 28, width: 28 }} source={require('../img/settings.png')} />
        }
        return <Image style={{ height: 28, width: 28 }} source={require('../img/settings-white.png')} />
    },
    tabBarOptions: {
      style: {
        backgroundColor: '#212121',
     },
      activeTintColor: '#3BC06B',
      inactiveTintColor: 'white'
    },
  })
}
)


const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
