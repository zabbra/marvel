import React, { useContext,useState ,Fragment, useEffect  } from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router";
import Loader from "../Loader";

const Welcome = () => {

    const [userSession,setUserSession] = useState(null)
    const [userData,setUserData] = useState({})
    const firebase = useContext(FirebaseContext)
    const navigate = useNavigate()

    useEffect(() =>{

        // ce systeme detecte si il y'a un utilisateur authentifier et verifie cela au montage du composant
        let listener = firebase.auth.onAuthStateChanged(user =>{
            user ? setUserSession(user) : navigate('/')
        })

        //si userSession est different du null
        if( !!userSession){
            firebase.user(userSession.uid).get()
            .then(doc =>{
                if(doc && doc.exists){
                    const myData = doc.data()
                    setUserData(myData)
                }

            })
            .catch(error =>{
                console.log(error)

            })
        }


        // ici sa arrete le liner lorsqu'on demonte le composant
        return () =>{
            listener()
        }
    },[userSession])

    return userSession === null ? (
        <Fragment>
            <Loader loadingMsg={'Authentification...'} styling={{textAlign:'center', color:'#FFFFFF'}}/>

        </Fragment>
    ):(
        <div className='quiz-bg'>
            <div className='container'>
                <Logout userData={userData}/>
                <Quiz userData={userData}/>
            </div>
        </div>

    )
   
}
export default Welcome