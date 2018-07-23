import { RootNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Main');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const initialNavState = RootNavigator.router.getStateForAction(
  firstAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}


const initialQuizState = { currentQuiz: null, historyQuiz: [] };

function quiz(state = initialQuizState, action){
    switch (action.type) {
        case 'newFastQuiz':
            return { ...state, currentQuiz: action.payload  };
        case 'saveHistoryFastQuiz': 
            return { ...state, historyQuiz: [...state.historyQuiz,  action.payload] };
        default:
            return state;
    }
}


const initialSettingState = { numQuestions: "5", numSeg: "60" };

function settings(state = initialSettingState, action){
    switch (action.type) {
        case 'newQuestionNumber':
            return { ...state, numQuestions: action.payload  };
        case 'newSegNumber': 
            return { ...state, numSeg: action.payload  };
        default:
            return state;
    }
}


export default { 
    nav,
    auth,
    quiz,
    settings
};
