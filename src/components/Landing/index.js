import React, {useEffect, useRef, useState} from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

/**
 * 
 * on va recuperer le main grace a un element qu'on appel useRef 
 * refWolverine c'est un objet qui va contenir une propriete current qui va etre null.
 * le but ici estde mettre tout notre composant main au niveau de current.donc on 
 * va prendre ce refWolverine et l'appliquer au niveau de main.
 * notre objet est maintenant au niveau de current avec toutes les autres proprietes
 * que nous pouvons associer a notre element(oncopy,onblur,onclick,title etc)
 * 
 * nous ce qu'on veux faire c'est de jouer sur welcomePage pour modifier l'image.comment 
 * on va faire en javaScript pour ajouter un element sans ecrase celle deja existante.on
 * passe evidemment par la propriete classList
 */
const Landing = () => {
    const [btn,setBtn] = useState(false)

    const refWolverine = useRef(null);

    console.log(refWolverine)
    useEffect(() =>{
        refWolverine.current.classList.add('startingImg')

        setTimeout(() =>{
            refWolverine.current.classList.remove('startingImg')
            setBtn(true)
        },1000)
    },[])

    const setLeftImg = () =>{
        refWolverine.current.classList.add('leftImg')
    }
    const setRightImg = () =>{
        refWolverine.current.classList.add('rightImg')
    }

    const clearImg = () =>{
        if(refWolverine.current.classList.contains('leftImg')){
            refWolverine.current.classList.remove('leftImg')
        }else if(refWolverine.current.classList.contains('rightImg')){
            refWolverine.current.classList.remove('rightImg')
        }
    }
//si btn est true je retourne quelque chose
    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                <Link to='/signup' className="btn-welcome">Incription</Link>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                <Link to='/login' className="btn-welcome">Connexion</Link>
            </div>
        </Fragment>
    )
    return(
        <main ref={refWolverine}  className="welcomePage" >
            {displayBtn}

        </main >

    )
}
export default Landing;