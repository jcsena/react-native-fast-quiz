import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';


const styles =  {
  padding: 15,
  minWidth: 200,
  marginBottom: 10,
  marginTop: 30,
  paddingRight: 10, 
  paddingLeft: 10, 
  borderRadius: 30,
  borderColor: "#3BC06B", 
  borderWidth: 1, 
  backgroundColor: '#3BC06B',
  alignItems: 'center',
  justifyContent: 'center'
};

const NewQuizButton = ({ initFastQuiz }) => (
  <TouchableOpacity 
    onPress={initFastQuiz}
    style={styles}>
        <Text style={{ color: 'white', fontSize: 16}}>START NEW QUIZ</Text>
  </TouchableOpacity>
);

NewQuizButton.propTypes = {
  initFastQuiz: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  initFastQuiz: () =>
    dispatch(NavigationActions.navigate({ routeName: 'FastQuiz' })),
});

export default connect(null, mapDispatchToProps)(NewQuizButton);
