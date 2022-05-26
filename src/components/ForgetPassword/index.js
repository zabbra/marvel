import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";



const ForgetPassword = () => {

    const [email,setEmail] = useState('');

    const [success,setSuccess] = useState(null)

    const [error,setError] = useState(null)

    const firebase = useContext(FirebaseContext)

    const handleSubmit = (e) =>{
        e.preventDefault();
        firebase.passwordReset(email)
        .then(()=>{
            setError(null)
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe`)
            setEmail('')

            setTimeout(() =>{
                //redirection vers la page login

            },5000)

        })
        .catch(error =>{
            setError(error)
            setEmail('')

        })

    }

    const disabled = email === '' ;
    
    return(
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'></div>
                    <div className='formBoxRight'>
                        <div className='formContent'>
                            { success && <span style={{
                                border:'1px solid green',
                                color:'#ffffff',
                                background:'green'
                            }}>{success}</span>}

                            {error && <span>{error.message}</span>}
                            <h2>Mot de pass oublié ?</h2>
                            <form onSubmit={handleSubmit}>
                            

                                <div className='inputBox'>
                                    <input type='email' onChange={(e) =>setEmail(e.target.value)} value={email} required autoComplete='off'/>
                                    <label htmlFor='email'>Email</label>
                                    
                                </div>
                                <button disabled={disabled}>Récupérer</button>


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
export default ForgetPassword