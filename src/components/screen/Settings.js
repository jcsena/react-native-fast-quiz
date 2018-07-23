import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import styles from './styles';

class Settings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            favColor: undefined
        };
    }

    render(){
        console.log(this.props)
        return (
            <View style={{backgroundColor: '#181617', flex: 1, padding: 40 }}>
                <View style={{ flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
                   <Text style={{color: 'white', fontSize: 17 }}>Number of questions   </Text>
                   <TextInput
                        onChangeText={(text) => this.props.dispatch({type: 'newQuestionNumber', payload: text})}
                        value={this.props.settings.numQuestions}
                        keyboardType="number-pad"
                        style={{height: 35,  borderRadius: 3, backgroundColor:'#595959', width: 70, fontSize: 16, color:'white', textAlign: 'center'}}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', marginTop: 40}}>
                    
                   <Text style={{color: 'white', fontSize: 17 }}>Expiration question time</Text>
                   <TextInput
                        onChangeText={(text) => this.props.dispatch({type: 'newSegNumber', payload: text})}
                        value={this.props.settings.numSeg}
                        keyboardType="number-pad"
                        style={{height: 35,  borderRadius: 3, backgroundColor:'#595959', width: 70, fontSize: 16, color:'white', textAlign: 'center'}}
                    />
                </View>

                    <TouchableOpacity 
                    onPress={Keyboard.dismiss}
                    style={[styles.button, { marginTop: 60, alignSelf: 'center' }]}>
                    <Text style={styles.textButton}>Save</Text>
                </TouchableOpacity>
            </View>
          );
    }
  
};

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Settings.navigationOptions = {
    title: 'Settigs',
    headerStyle: {
        backgroundColor: '#212121',
        borderBottomWidth: 0,
    },
      headerTitleStyle: {
        color: '#3BC06B'
    },
    headerBackTitleStyle: {
        color: 'white'
    }
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  settings: state.settings
});

export default connect(mapStateToProps)(Settings);
