import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './LoginSingup.css'
import email_img from '../Assets/email.png'
import password_img from '../Assets/password.png'


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const goToRegister = () => {
        navigate("/register");
    };
    const handleClick = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Réponse du serveur :', data);
    } catch (error) {
        console.error('Erreur:', error);
    }
};

return (
    <div className='body'>
        <div className='container'>
            <div className="header">
                <a href="/">
                    &lt;&lt; Retour à l'écran d'accueil
                </a>
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={email_img} alt="My e-mail" />
                    <input type="email" placeholder='email'value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_img} alt="My password" />
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="alert-message"></div>
                <div className="submit-container">
                    <button className="submit" onClick={goToRegister}>Sign Up</button>
                    <button className="submit" onClick={handleClick}>Login</button>
                </div>
            </div>
        </div>
    </div>
)
}

export default Login