import React,{useEffect,useState} from "react";
import Stepper from 'react-stepper-horizontal'


const Levels = (props) => {

    const {quizLevel,levelNames} = props

    const [levels,SetLevels] = useState([])

    useEffect(() =>{
        const quizStep = levelNames.map(level => ({title: level.toUpperCase()}));
        SetLevels(quizStep);
    },[levelNames]);

    return (
        <div className='levelsContainer' style={{background:'transparent'}}>
            {/*<h2 className='headingLevels'>{levelNames[quizLevel]}</h2>*/}
                <Stepper 
                    steps = {levels}
                    activeStep = {quizLevel}
                    circleTop={0} //margin top
                    activeTitleColor={'#d31017'} // active title color par defaut c'est #000
                    activeColor={'#d31017'} // active circle color #5096FF
                    completeTitleColor={'#E0E0E0'} //Completed title color
                    defaultTitleColor={'#E0E0E0'} //Default title color - not active or completed
                    completeColor={'#E0E0E0'} //	Completed circle color
                    completeBarColor={'#E0E0E0'} //Color of bar connected to a completed step
                    barStyle={'dashed'} //Style of bar separating steps
                    size={45}
                    circleFontSize={20}
                />
        </div>
    )
   
}
export default React.memo(Levels)

/**
 * <Stepper 
                    steps = {[
                        {title: 'Debutant' },
                        {title: 'Confirme' },
                        {title: 'Expert' }
                    ]
                }
                activeStep = {1}
                />
 */