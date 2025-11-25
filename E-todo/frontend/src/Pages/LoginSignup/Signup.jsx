import { data, useNavigate } from "react-router-dom";
import { useState } from "react";
import './LoginSingup.css'
import email_img from '../Assets/email.png'
import person_img from '../Assets/person.png'
import password_img from '../Assets/password.png'


const Singup = () => {

    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate("/login");
    };

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, firstname })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                setError("Error");
                return;
            }

            const data = await response.json();


            if (!data.success) {
                setError(data.message);
            } else {
                localStorage.setItem("token", data.token)

                setError("");
                navigate(`/user/todos`)
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError("Erreur de connexion au serveur: " + error.message);
        }
    };


    return (
        <div className='body'>
            <div className='container'>
                <div className="header">
                    <a href="/">
                        &lt;&lt; Home page
                    </a>
                    <div className="text">Sign up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={person_img} alt="My name" />
                        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={person_img} alt="My name" />
                        <input type="text" placeholder='Firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={email_img} alt="My e-mail" />
                        <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src={password_img} alt="My password" />
                        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p className="alert-message" >{error}</p>
                    <div className="submit-container">
                        <button className="submit" onClick={handleClick}>Sign Up</button>
                        <button className="submit" onClick={goToLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singup







