# react-native-fast-quiz
A react native overnight application about local fast quiz and simple.


## Technologies
* react-natve 0.56
* react-navigation
* redux 
* redux-persit //local storage histories quiz
* [All packages](https://github.com/jcsena/react-native-fast-quiz/blob/master/package.json)


## installation

```
$ git clone https://github.com/jcsena/react-native-fast-quiz.git
$ cd react-native-fast-quiz
$ yarn install
$ react-native run-ios || run-android
```

## Config 

./src/questions/index.js set your questions for your local fast quiz

### Template
```js

        {
                    id:3, // id question and order question
                    q: 'Question 3', // title question
                    co: 'o3', // correct options
                    o: { // options and you can write n options
                        o1: 'Option 1',
                        o2: 'Option 2',
                        o3: 'Option 3'
                    }
        }

```

### Screen Shot

![alt text](https://github.com/jcsena/react-native-fast-quiz/blob/master/screenshot/edash.png?raw=true "Dash")

![alt text](https://github.com/jcsena/react-native-fast-quiz/blob/master/screenshot/qn.png?raw=true "Question") 

![](https://github.com/jcsena/react-native-fast-quiz/blob/master/screenshot/fs.png?raw=true "Review the quiz is very easy ...") 
![](https://github.com/jcsena/react-native-fast-quiz/blob/master/screenshot/rq.png?raw=true) 

![](https://github.com/jcsena/react-native-fast-quiz/blob/master/screenshot/dash.png?raw=true "Emoji feedback :)")
