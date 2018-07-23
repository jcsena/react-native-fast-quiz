import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, SectionList} from 'react-native';

import questions from '../../questions';

const q = questions.systems;


class Questions extends React.Component { 

    constructor(props){
        super(props);
    }

    getQuestions(){
        return q.map((question, i) => {
            const data =  Object.keys(question.o).map((k) => ({  k: k , v: question.o[k], is: k === question.co, isu: true }));
            return {...question, data, order: i + 1 };
        })
    }

    renderQuestionDetail(){
        const questionsRealMark =  this.getQuestions();

        return (
            <SectionList
            initialNumToRender={4}
            style={{ paddingLeft:10, paddingRight: 10 }}
            renderItem={({item}) => {
                   const color = item.is ? '#3BC06B' : 'white';
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
                  {this.renderQuestionDetail()}
             </View> 
        );
    }
}

Questions.propTypes = {
//   _id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
//   quiz: PropTypes.object.isRequired
};

Questions.navigationOptions = {
    title: 'Questions and answers',
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

export default connect(mapStateToProps)(Questions);
