import React from 'react';
import { StyleSheet, View, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import NewQuizButton from './NewQuizButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181617',
  },
});

class MainScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
        headerRight: (
          <Button
            onPress={() => navigation.navigate({ routeName: 'FastQuiz' })}
            title="+ Quiz"
            color="#3BC06B"
          />
        ),
        headerStyle: {
            backgroundColor: '#212121',
            borderBottomWidth: 0
        },
        headerTitleStyle: {
            color: '#3BC06B'
        },
        headerBackTitleStyle: {
            color: 'white'
        }
    };
  };

  renderEmoji(percent){
    if(percent <= 20 ) return <Text style={{fontSize: 50 }}>😱</Text>;
    if(percent <= 30 ) return <Text style={{fontSize: 50 }}>😰</Text>;
    if(percent <= 40 ) return <Text style={{fontSize: 50 }}>😨</Text>;
    if(percent <= 50 ) return <Text style={{fontSize: 50 }}>😧</Text>;
    if(percent <= 60 ) return <Text style={{fontSize: 50 }}>😔</Text>;
    if(percent <= 65 ) return <Text style={{fontSize: 50 }}>😟</Text>;
    if(percent <= 70 ) return <Text style={{fontSize: 50 }}>🙁</Text>;
    if(percent < 75 ) return <Text style={{fontSize: 50 }}>😅</Text>;
    if(percent <= 80 ) return <Text style={{fontSize: 50 }}>🧐</Text>;
    if(percent <= 85 ) return <Text style={{fontSize: 50 }}>😎</Text>;
    if(percent <= 95 ) return <Text style={{fontSize: 50 }}>🤩</Text>;
    return (<Text style={{fontSize: 50 }}>🤯💃</Text>);
  }

  renderHistory(item){
    return (
    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate('QuizDetail', { _id: item._id })}
      style={{ backgroundColor:'#1e1e1e', borderRadius:3, marginLeft: 10, marginRight: 10, padding: 10, paddingTop: 20, marginTop: 10 }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent:'space-around' }}>
            <Text style={{ fontSize: 35, color: 'white' }}>{item.correct} / {item.total}</Text>
            {this.renderEmoji(parseInt(item.correct/item.total*100))}
            <Text style={{ fontSize: 35, color: 'white' }}>{ parseInt(item.correct/item.total*100)}%</Text>
          </View>
          <View style={{ flexDirection: 'row' , justifyContent: 'flex-end', marginTop: 10, marginBottom: 5, marginRight: 10}}>
            <Text style={{color: 'grey', fontSize: 12 }}>{moment(item.date).fromNow()}</Text>
          </View>
        </View>
    </TouchableOpacity>
    );
  }

  render(){
    if(!this.props.quiz.historyQuiz.length) 
    return( 
      <View style={styles.container}> 
        <Text style={{textAlign: "center", color: 'white', fontSize: 30, marginBottom: 10 }}>Ups!</Text>
        <Text style={{textAlign: "center", color: 'white', fontSize: 17 }}>You still do not have any quiz in your story, but you can start one now!</Text>
        <NewQuizButton />
      </View>
    );
    const data = this.props.quiz.historyQuiz.sort((a, b) => parseFloat(b.date) -  parseFloat(a.date));
    return(
     <View style={{flex: 1, backgroundColor: '#181617',  paddingTop: 10 }}>
        <FlatList
          data={data}
          renderItem={({item}) => this.renderHistory(item)}
        />
       </View>
    );
  }
}

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(mapStateToProps)(MainScreen);
