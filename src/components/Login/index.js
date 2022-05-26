import React, {useState , useEffect, useContext } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { FirebaseContext } from "../Firebase"








const Login = () => {

    const firebase = useContext(FirebaseContext)
    const navigate = useNavigate()

    

    //console.log(firebase)

    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [btn,setBtn] = useState(false)
    const [error,setError] = useState('');


    useEffect(() =>{
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }else if(btn === true){
            setBtn(false)

        }
    },[password,email,btn])

    

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(email,password)
        console.log(firebase)

        firebase.loginUser(email,password)
        .then(user =>{
            console.log(user)
            setEmail('');
            setPassword('')
            //rediriger le user vers la page welcome
            navigate('/welcome')
           
            
            })
        .catch(error =>{
            setError(error)
            setEmail('');
            setPassword('')
            
           
        })
    }
    
    
    return(
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftLogin'></div>
                    <div className='formBoxRight'>
                        <div className='formContent'>
                            {/*Affiche me massage d'erreur ,en fait le message capturé*/}
                            {error !== '' && <span>{error.message}</span>}
                            <h2>Connexion</h2>
                            <form onSubmit={handleSubmit}>
                            
                               

                                <div className='inputBox'>
                                    <input type='email' onChange={(e) =>setEmail(e.target.value)} value={email} required autoComplete='off'/>
                                    <label htmlFor='email'>Email</label>
                                    
                                </div>

                                <div className='inputBox'>
                                    <input type='password' onChange={(e) =>setPassword(e.target.value)}  value={password} required autoComplete='off'/>
                                    <label htmlFor='password'>Mot de passe</label>
                                    
                                </div>

                               {btn ? <button>Connexion</button> : <button disabled>Connexion</button> }

                            </form>
                            <div className='linkContainer'>
                                <Link to ='/signup' className='simpleLink'>Nouveau su Marvel Quiz ? Inscrivez-vous maintenant</Link>
                                <br/>
                                <Link to ='/forgetpassword' className='simpleLink'>Mot de passe oublié? Récupérez-le ici</Link>

                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
    
    )
}
export default Login