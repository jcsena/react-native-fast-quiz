import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import CountdownCircle from 'react-native-countdown-circle'

import questions from '../../questions';
import styles from './styles';

// const this.props.settings.numQuestions = 5;
const q = questions.systems;
const barWidth = Dimensions.get('screen').width - 30


class FastQuiz extends React.Component { 

    constructor(props){
        super(props);
        this.state = {
            timer: true
        };
    }

    componentWillMount(){
        this.getRandonQuestions();
    }

    getUniqueId(){
        return Math.random().toString(36).substring(2);
    }
    getRandonQuestions(){
        const arr = []
        while(arr.length < this.props.settings.numQuestions){
            const randomnumber = Math.floor(Math.random()* q.length) + 1;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
        }
        const fastQuiz = arr.map(i => ({ q: i }));
        const quiz = { _id: this.getUniqueId(), questions: fastQuiz, date: (new Date()).valueOf() }
        this.props.dispatch({type: 'newFastQuiz', payload: quiz });
        // this.setState({ fastQuiz });
    }

    onSelectAnwer(qu, a){
        this.setState({timer: false })
        const {  currentQuiz } = this.props.quiz; 
        const oldQuiz = currentQuiz.questions.filter(i => i.q !== qu.id); 
        const newQuiz = [{q: qu.id, a }, ...oldQuiz ];
    
        const newFastQuiz = { ...currentQuiz, questions: newQuiz }

        const res = newQuiz.filter(q => !q.a);
        if(!res.length) {

            let aceptAwers = 0; 
            newFastQuiz.questions.forEach(question => {
                realQuestion = q.find(qu => qu.id === question.q);
                if(realQuestion.co === question.a) aceptAwers += 1;
            });

            this.props.dispatch({type: 'saveHistoryFastQuiz', payload: {...newFastQuiz, correct: aceptAwers, total: currentQuiz.questions.length }  });
        }
        this.props.dispatch({type: 'newFastQuiz', payload: newFastQuiz });
        setTimeout(()=> {
            this.setState({timer: true })
        },1)
    }

    getQuestionAnwers(q){
        if(!q) return null;
        if(!q.o) return null;
       const keys =  Object.keys(q.o);
       return keys.map(k => {
        //    return (<Button title={q.o[k]} color="##3BC06B" />)
            return (
                <TouchableOpacity 
                onPress={() => this.onSelectAnwer(q, k) }
                style={[styles.button, { marginTop: 10 }]}>
                   <Text style={styles.textButton}>{q.o[k]}</Text>
               </TouchableOpacity>
            )
       })
    }

    getNextQuestions(){
        const { quiz } = this.props; 
        if(!quiz.currentQuiz) return null;
        const nextQuestion  = quiz.currentQuiz.questions.find(q => !q.a);
        if(nextQuestion){
            realQuestion = q.find(qu => qu.id === nextQuestion.q);
            realAwsers = this.getQuestionAnwers(realQuestion);
            return (
                <View style={styles.contentList}>
                    <Text style={styles.titleQuestion}>{realQuestion.q}</Text>
                    <View style={{ marginTop: 10 }}>
                        { realAwsers }
                    </View>
                    {this.state.timer && <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <CountdownCircle
                            seconds={this.props.settings.numSeg}
                            radius={30}
                            borderWidth={8}
                            color="#3BC06B"
                            bgColor="#181617"
                            textStyle={{ fontSize: 20, color: 'white' }}
                            onTimeElapsed={() => this.onSelectAnwer(realQuestion, 'i')}
                        />
                    </View>}
                </View>
            )
        }
        return  null;
    }

    getCurrentBar(){
        const { currentQuiz } = this.props.quiz; 
        if(!currentQuiz) return null;
        const pedingQuestions  = currentQuiz.questions.filter(q => !q.a);
        const restQuestios = this.props.settings.numQuestions - pedingQuestions.length
        const value = parseInt(((restQuestios)/ this.props.settings.numQuestions)*100)
        return (
        <View style={{ marginTop: 15 }}>
            <Text style={styles.textBarStatus}>Question {restQuestios} / {this.props.settings.numQuestions}</Text>
            <View style={styles.contentBarStatus}>
                <ProgressBarAnimated
                        backgroundColor="#3BC06B"
                        width={barWidth}
                        value={value}
                        height={10}
                        borderColor="white"
                />
            </View>
        </View>  
      );
    }

    renderResult(){
        const { currentQuiz } = this.props.quiz; 
        if(!currentQuiz) return null;
        const pedingQuestions  = currentQuiz.questions.filter(q => !q.a);
        if(pedingQuestions.length) return null;

        let aceptAwers = 0; 

        currentQuiz.questions.forEach(question => {
            realQuestion = q.find(qu => qu.id === question.q);
            if(realQuestion.co === question.a) aceptAwers += 1;
        });
        
        return (
            <View style={styles.contentQuestions}>
                <Text style={styles.titleFinal}>Final score</Text>
                <View style={styles.contentResult}>
                    <Text style={styles.textResult}>{aceptAwers} / {this.props.settings.numQuestions}</Text>
                    <Text style={styles.textResultPercent}>{ parseInt((aceptAwers/this.props.settings.numQuestions) * 100)}%</Text>
                </View>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('QuizDetail', { _id: currentQuiz._id })}
                style={styles.button}>
                   <Text style={styles.textButton}>Show Quiz</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                onPress={() => this.getRandonQuestions() }
                style={[styles.button, { backgroundColor: '#3BC06B', marginTop: 10 }]}>
                   <Text style={styles.textButton}>Start another Quiz</Text>
               </TouchableOpacity>
            </View>
        )
    }

    render() {
        // const nextQuestion = this.getNextQuestions();
        return (
             <ScrollView style={{backgroundColor: '#181617', flex: 1, paddingTop: 10 }}>
                     {this.getCurrentBar()}
                     {this.renderResult()}
                     {this.getNextQuestions()}
             </ScrollView> 
        );
    }
}


FastQuiz.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};

FastQuiz.navigationOptions = {
    title: 'Fast Quiz',
    headerStyle: {
        backgroundColor: '#212121',
        borderBottomWidth: 0
    },
      headerTitleStyle: {
        color: '#3BC06B'
    },
    headerBackTitleStyle: {
        color: 'white'
    },
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  quiz: state.quiz,
  settings: state.settings
});

export default connect(mapStateToProps)(FastQuiz);
