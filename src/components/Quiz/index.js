import React from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel";
import QuizOver from "../QuizOver";
import {  toast } from 'react-toastify';
import { Fragment } from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { FaChevronRight } from 'react-icons/fa';

toast.configure()

const initialState={
    quizLevel: 0,
    maxQuestions:10,
    storedQuestions:[],
    question:null,
    options:[],
    idQuestion:0,
    btnDisabled:true,
    userAnswer:null,
    score:0,
    showWelcomeMsg:false,
    quizEnd:false,
    percent:null

}

const levelNames = ['debutant','confirme', 'expert']


class Quiz extends React.Component{

    constructor(props){
        super(props)

        this.state = initialState
        this.storeDataRef = React.createRef()

    }

   

    

     loadQuestions = quizz =>{
         
         const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
         //console.log(fetchedArrayQuiz)

         if(fetchedArrayQuiz.length >= this.state.maxQuestions){
             const newArray = fetchedArrayQuiz.map(({answer , ...keepRest}) => keepRest)
             //console.log(newArray)

             //recupere le tableau avec tout les donnees ainsi que les reponses
             this.storeDataRef.current = fetchedArrayQuiz
             //console.log(this.storeDataRef.current )

             this.setState({
                storedQuestions: newArray
             })

         }else{
             console.log('pas assez de questions')
         }
    }


    showToastMsg = pseudo =>{
    
        if(!this.state.showWelcomeMsg){

            this.setState({
                showWelcomeMsg: true
            })

            toast.warn(`Bienvenue ${pseudo} , et bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            
            })
            
        }
        

    }


    componentDidMount(){
        this.loadQuestions(levelNames[this.state.quizLevel])

    }

    nextQuestion = () =>{
        // si on arrive a la dernier question du niveau sur lequel on se trouve
        if(this.state.idQuestion === this.state.maxQuestions - 1){
            //end
            //this.gameOver();
            this.setState({
                quizEnd:true
            })
        }else{
            this.setState(prevState =>({
                idQuestion:prevState.idQuestion + 1
            }))
        }




        const goodAnwer = this.storeDataRef.current[this.state.idQuestion].answer
        if(this.state.userAnswer === goodAnwer){
            this.setState(prevState =>({
                score : prevState.score + 1

            }))

            toast.success('Bravo + 1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                //bodyClassName:"toastify-color" permet de definir le style de toastify
            
            })
        }else{
            toast.error('Mauvaise reponse 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                //bodyClassName:"toastify-color"
            
            })

        }
    }

    componentDidUpdate(prevProps , prevState){

        const {
           
            maxQuestions,
            storedQuestions,
            idQuestion,
            score,
            quizEnd
        
        } = this.state

        if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length){
            //console.log(this.state.storedQuestions[0].question)
            this.setState({
                question:storedQuestions[idQuestion].question,
                options:storedQuestions[idQuestion].options
                
            })

        }

        if((idQuestion !== prevState.idQuestion) && storedQuestions.length){
            this.setState({
                question:storedQuestions[idQuestion].question,
                options:storedQuestions[idQuestion].options,
                userAnswer:null,
                btnDisabled:true
            })
        }

        if(this.state.quizEnd !== prevState.quizEnd){
            //console.log(this.state.score)
            const gradepercent = this.getPercentage(maxQuestions, score)
            this.gameOver(gradepercent)
        }

        if(this.props.userData.pseudo !== prevProps.userData.pseudo ){
            this.showToastMsg(this.props.userData.pseudo )
        }
    }

    submitAnswer = selectedAnswer =>{
        this.setState({
            userAnswer:selectedAnswer,
            btnDisabled:false
        })

    }

    getPercentage = (maxQuest,ourScore) => (ourScore / maxQuest)*100;

    gameOver = (percent) =>{


        if(percent >= 50){
            this.setState({
                quizLevel:this.state.quizLevel + 1,
                percent:percent
            })

        }else{
            this.setState({
                percent:percent
            })

        }

    }

    loadLevelQuestions = param =>{
        this.setState({
            ...initialState,
            quizLevel: param
        })

        this.loadQuestions(levelNames[param])

    }
    render(){
        
        const {
            quizLevel,
            maxQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent
        
        } = this.state

        const displayOptions = options.map((option ,index)=>{
            return(
                <p key={index} onClick={() => this.submitAnswer(option)} 
                className={`answerOptions ${userAnswer === option ? ' selected' : null }`}
                >
                    <FaChevronRight/>{option}
                </p>
            )
        })
        //https://getwaves.io
        return quizEnd ? (
            <QuizOver 
                ref={ this.storeDataRef} 
                levelNames ={levelNames}
                score = {score}
                maxQuestions= {maxQuestions}
                quizLevel ={quizLevel}
                percent = {percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ):(
            <Fragment>
                <Levels 
                loadLevelQuestions = {this.loadLevelQuestions}
                quizLevel ={quizLevel}
                levelNames ={levelNames}
                />
                <ProgressBar idQuestion={idQuestion} maxQuestions ={maxQuestions}/>
                <h2>{question}</h2>
                {displayOptions}

                <button className='btnSubmit' disabled={btnDisabled} onClick={this.nextQuestion}>
                    {idQuestion < maxQuestions - 1  ? "Suivant" : "Terminer"} 
                </button>
            </Fragment>

        )
    }
}

export default Quiz