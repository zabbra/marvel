import React,{ Fragment,useEffect,useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi';
import Loader from '../Loader';
import Modal from '../Modal';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios' 
//faire des http requset pour recupere la data au niveau de l'api puis stocker dans le state et l'afficher



const QuizOver = React.forwardRef((props,ref) => {

    const {
        levelNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions
    } = props

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    console.log(API_PUBLIC_KEY)
    const hash = '17414e143cbd74bbae0d16e516aa613d'

    //console.log(props)
    //console.log(ref)

    const [asked,setAsked]=useState([])
    const [openModal,setOpenModal]=useState(false)
    const [characterInfos,setCharacterInfos]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(() =>{
        setAsked(ref.current)

        /*if(localStorage.getItem('marvelStorageDate')){
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
        }*/

    },[ref])

    /*const checkDataAge = date =>{

        const today = Date.now();
        const timeDifference = today - date

        const daysDifference = timeDifference / (10000*3600 * 24)

        if (daysDifference >= 15 ){
            localStorage.clear()
            localStorage.setItem('marvelStorageDate' , Date.now())
        }

    }*/

    const showModal = (id) =>{
        setOpenModal(true)

        if(localStorage.getItem(id)){
            setCharacterInfos(JSON.parse(localStorage.getItem(id)))
            setLoading(false)

        }else{
            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then((reponse) =>{
               console.log(reponse) 
               setCharacterInfos(reponse.data)
               setLoading(false)
               localStorage.setItem(id , JSON.stringify(reponse.data)) //setItem pour enregistrer
    
               if(!localStorage.getItem('marvelStorageDate')){
                localStorage.setItem('marvelStorageDate' , Date.now()) //getItem pour recuperer si c'est false donc on a pas marvelStorageDate
               } 

            })
            .cacth(error=> console.log(error))
            
        }

     

    }

    const closeModal = () =>{
        setOpenModal(false)
        setLoading(true)
    }

    const capitalizeFirstLetter = string =>{
        return string.charAt(0).toUpperCase() +  string.slice(1)
    }



    const averageGrade = maxQuestions / 2 //moyenne

    if (score < averageGrade){
        //setTimeout(() => {loadLevelQuestions(0)},3000)
        setTimeout(() => {loadLevelQuestions(quizLevel)},5000)

    }

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className='stepsBtnContainer'>
                {
                    quizLevel < levelNames.length ?
                    (
                        <Fragment>
                            <p className='successMsg'>Bravo, passez au niveau suivant</p>
                            <button 
                                className='btnResult success'
                                onClick={() => loadLevelQuestions(quizLevel)}
                            >
                                Niveau Suivant
                            </button>

                        </Fragment>
                    ):
                    (
                        <Fragment>
                            <p className='successMsg'>
                                <GiTrophyCup size='50px'/>Bravo, vous etes un expert
                            </p>
                            <button 
                                className='btnResult gameOver'
                                onClick={() => loadLevelQuestions(0)}
                            >
                                Accueil
                            </button>

                        </Fragment>
                    )
                }
                    
            </div>
            <div className='percentage'>
                <div className='progressPercent'> Reussite : {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
           

        </Fragment>

    )
    :
    (
        <Fragment>
            <div className='stepsBtnContainer'>
                <p className='failureMsg'>Vous avez échoué !</p>
            </div>
            <div className='percentage'>
                <div className='progressPercent'> Reussite : {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>

            </div>

        </Fragment>

    )

    const questionAnswer = score >= averageGrade ? 
    (
        asked.map(item =>{
            return(
                <tr key={item.id}>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>
                        <button 
                            className='btnInfo'
                            onClick={() => showModal(item.heroId)}
                        >
                        Infos
                        </button>
                    </td>
                </tr>
            )
    
        })

    )
    :
    (
        <tr>
            <td colspan='3'>
               <Loader loadingMsg={'Pas de réponses'} styling={{textAlign:'center', color:'red'}}/>

            </td>
            
            
        </tr>
         
    )

    const resultInModal = !loading ? (
        <>
            <div className='modalHeader'>
                <h2>characterInfos.data.results[0].name</h2>
                <FaTimes size='1.5em' onClick={closeModal} /> 
            </div>
            <div className='modalBody'>
                <div className='comicImage'>
                        <img 
                            scr={characterInfos.data.results[0].thumbnail.path+'.'+characterInfos.data.results[0].thumbnail.extension} 
                            alt={characterInfos.data.results[0].name}
                        />
                        <p>{characterInfos.attributionText}</p>

                </div>
                <div className='comicDetails'>
                    <h3>Description</h3>
                    {
                        characterInfos.data.results[0].description ?
                        <p>{characterInfos.data.results[0].description}</p>
                        :
                        <p>Description indisponible</p>

                    }
                    <h3>Plus d'infos</h3>
                    {
                        characterInfos.data.results[0].urls && 
                        characterInfos.data.results[0].urls.map((item,index) =>{
                            return <a 
                                key={index} 
                                href={item.url} 
                                target='_blank' 
                                rel='noopener noreferrer'
                            >
                                {capitalizeFirstLetter(item.type)}
                            </a>
                        })
                    }
                </div>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn' onClick={closeModal}>Fermer</button>

            </div>
        </>

    ):(
        <>
            <div className='modalHeader'>
                <h2>Reponse de Marvel</h2>
                <FaTimes size='1.5em'  onClick={closeModal} /> 
            </div>
            <div className='modalBody'>
                <Loader/>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn'  onClick={closeModal}>Fermer</button>

            </div>
        </>


    )
  
    return(
        <Fragment>
            {decision}
            <hr/>
            <p>Les reponses aux questions posees:</p>

            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Qestion</th>
                            <th>Reponse</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                       {questionAnswer}

                    </tbody>

                </table>
            </div>
            <Modal showModal={openModal} >
                
                {resultInModal}
            </Modal>

        </Fragment>
        

    )
})
export default React.memo(QuizOver);