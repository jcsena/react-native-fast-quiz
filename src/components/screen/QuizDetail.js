import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Text, View,  SectionList} from 'react-native';

import questions from '../../questions';

const q = questions.systems;


class QuizDatail extends React.Component { 

    constructor(props){
        super(props);
    }

    getHistoryQuiz(){
       const { navigation, quiz} = this.props;
       const _id = navigation.getParam('_id', 'ovka0dxqwsk');
       return  quiz.historyQuiz.find(q => q._id === _id);
    }

    getQuestion(id){
        return q.find(qu => qu.id === id);
    }

    renderStat(){
        const quizHistory = this.getHistoryQuiz();
        if(!quizHistory) return null;
        if(!quizHistory.correct) return null;
        const { total, correct } = quizHistory;
        const percent = parseInt((correct/total)*100);
        return(
        <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-around', padding: 5, backgroundColor:'#2C2C2C'}}>
            <Text style={{color:'white', fontSize: 22 }}>{correct} / {total}</Text>
            <Text style={{color:'white', fontSize: 22, fontWeight: '400' }}>{percent}%</Text>
        </View>
        )
    }

    getDataStats(){
        const quizHistory = this.getHistoryQuiz();
        const questionsMark = quizHistory.questions;
        const questionsRealMark = questionsMark.map((m,i) => {
            const question = this.getQuestion(m.q);
            const data = Object.keys(question.o).map(k => ({  k: k , v: question.o[k], is: k === question.co, isu: m.a === k }));
            return {...this.getQuestion(m.q), a: m.a, data, order: i + 1 };
        });
       return questionsRealMark;
    }

    renderQuestionDetail(){
        const questionsRealMark =  this.getDataStats();

        return (
            <SectionList
            style={{ paddingLeft:10, paddingRight: 10 }}
            renderItem={({item}) => {
                   const color = item.is ? '#3BC06B' : (item.isu && !item.is) ? 'red': 'white';
                   return( 
                   <View style={{padding: 10, marginLeft:10, marginRight: 10, marginBottom: 10, borderWidth:1, borderColor: color, borderRadius: 5 }}>
                        <Text style={{color:'white'}}>{item.v}</Text>
                    </View>
                    );
                  }
                }
            renderSectionHeader={({section, index}) => <Text style={{ color: 'white', textAlign: 'justify', fontSize: 17, fontWeight: 'bold', padding: 10, paddingTop: 20, marginBottom:10, backgroundColor: '#181617' }}>{section.order}. {section.q}</Text>}
            sections={questionsRealMark}
          />
        );
    }

    render() {

        return (
             <View style={{backgroundColor: '#181617', flex: 1 }}>
                  {this.renderStat()}
                  {this.renderQuestionDetail()}
             </View> 
        );
    }
}

QuizDatail.propTypes = {
//   _id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
//   quiz: PropTypes.object.isRequired
};

QuizDatail.navigationOptions = {
    title: 'Quiz Detail',
    headerStyle: {
        backgroundColor: '#212121',
        borderBottomWidth: 0,
    },
      headerTitleStyle: {
        color: '#3BC06B'
    },
    headerBackTitleStyle: {
        color: 'white'
    },
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(mapStateToProps)(QuizDatail);
