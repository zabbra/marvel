import React,{useState,useContext} from "react";
import { FirebaseContext } from "../Firebase";
import { Link,useNavigate } from "react-router-dom";


const Signup = () => {

    const firebase = useContext(FirebaseContext);
    //console.log(firebase)
   
   

    
    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    //Redirection avec react-router-dom v6
    const navigate = useNavigate()
    

    const [loginData,setLoginData] = useState(data)

    const [error,setError] = useState('')

    const {pseudo ,email, password,confirmPassword} = loginData;

   const btn = pseudo === '' || email ==='' || password ==='' || password !== confirmPassword  ? 
   <button disabled> Inscription</button>:<button > Inscription</button>  
   

    const handleChange = (e) =>{
        setLoginData({...loginData, [e.target.id]:e.target.value})
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const {email, password , pseudo} = loginData;
        console.log(firebase);
        console.log(email,password)
       firebase.signupUser(email,password)
       .then((authUser) =>{
           return firebase.user(authUser.user.uid).set ({
               pseudo:pseudo,
               email, //ou email : email
               //password:password

           })

       })
       .then(user =>{
           //console.log(user)
           //console.log(user.uid)
           setError('')
           setLoginData({...data})
           navigate('/welcome')
       })
       .catch(error =>{
           setError(error);
           setLoginData({...data})
       })
        
    }

// gestion erreurs

const errorMsg = error !== '' && <span>{error.message}</span>

    return(
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftSignup'></div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                        <h2>Incription</h2>
                        <form onSubmit={handleSubmit}>
                           
                            <div className='inputBox'>
                                <input type='text' onChange={handleChange} id='pseudo' value={pseudo} required autoComplete='off'/>
                                <label htmlFor='pseudo'>Pseudo</label>
                                
                            </div>

                            <div className='inputBox'>
                                <input type='email' onChange={handleChange} id='email' value={email} required autoComplete='off'/>
                                <label htmlFor='email'>Email</label>
                                
                            </div>

                            <div className='inputBox'>
                                <input type='password' onChange={handleChange} id='password' value={password} required autoComplete='off'/>
                                <label htmlFor='password'>Mot de passe</label>
                                
                            </div>

                            <div className='inputBox'>
                                <input type='password' onChange={handleChange} id='confirmPassword' value={confirmPassword} required autoComplete='off'/>
                                <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                            </div>

                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link to ='/login' className='simpleLink'>Déjà inscrit? Connectez-vous</Link>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    
    )
}
export default Signup