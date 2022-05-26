import React, { useState ,useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { GoPerson } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';

const Logout = (props) =>{

    const {pseudo} = props.userData

    const firebase = useContext(FirebaseContext)

    const [checked,setChecked] = useState(false)

    console.log(checked)

    useEffect(() =>{
        if(checked === true){
            //console.log('Deconnexion')
            firebase.signoutUser();
        }

    },[checked,firebase])

    const handleChange = (e) =>{
        //console.log(e.target)
        setChecked(e.target.checked)
    }
    return(
        <div className='logoutContainer'>
            <h2 style={{color:'#FFFFFF' ,}}>
                <GoPerson size='50px' style={{backgroundColor:'#1ecc78',borderRadius:'50%'}} />
                <span style={{color:'#1ecc78',paddingLeft:'25px'}}>{pseudo}</span>
            </h2>
            
            <label className='switch'>
                <input type='checkbox' checked={checked} onChange={handleChange}/>
                <span className='slider round' data-tip='Déconnexion'></span>
            </label>
            <ReactTooltip 
                place='left'
                effect='solid'
            />
            
        </div>

    )
}
export default Logout