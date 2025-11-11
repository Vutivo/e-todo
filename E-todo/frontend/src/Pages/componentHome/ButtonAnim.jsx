import { useState } from "react";
export default function ButtonAnim({ ButtonRegister, ButtonLogin}){

    //state
    const [animRegister, setAnimRegister] = useState(false);
    const [animLogin, setAnimLogin] = useState(false);
    // comportement
    function triggerAnimRegister() {
        setAnimRegister(true);
        // Retire la classe une fois l'animation terminée (on peux la relancer)
        setTimeout(() => setAnimRegister(false), 3100); 
        // durée de l'animation (un peu plus que le temps de l'animation)
        }
    function triggerAnimLogin() {
        setAnimLogin(true);
        setTimeout(()=> setAnimLogin(false), 3100);
    }
    //affichage (render)
    return (
        <div>
            <button
                className={`onBox submit ${animRegister ? "animate" : ""}`}
                onMouseEnter={triggerAnimRegister}
                onClick= {ButtonRegister}
            >
                Register
            </button>
            <button
                className={`onBox submit ${animLogin ? "animate" : ""}`}
                onMouseEnter={triggerAnimLogin}
                onClick= {ButtonLogin}
            >
                Login
            </button> 
        </div>
    )
    
}