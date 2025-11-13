import { useState } from "react";
import './Connected.css';
import imgParams from './Assets/imgParametres.png';
import Display from './componentsConnected/Display';


const Connected = () => {
    const [open, setOpen] = useState(false)
    const Open = () =>{
        setOpen(!open);
    }
    return (
        <body>
            <header>
                <div className='flex'>
                    <div>name.firstname</div>
                    <div>email:</div>
                    <div>
                        <button className='settings'>
                            <img className="settings" src={imgParams} alt='Settings' onClick={Open}/>
                        </button>
                        {open && <Display />}
                    </div>
                </div>
            </header>
            <main>
                <div className='container'>
                    <div className='GotInfo'>not started</div>
                    <div className='GotInfo'>todo</div>
                    <div className='GotInfo'>in progress</div>
                    <div className='GotInfo'>done</div>
                    <button className='NoInfo'>Create your 1st to do list</button>
                </div>
            </main>
        </body>
    )
    
}

export default Connected