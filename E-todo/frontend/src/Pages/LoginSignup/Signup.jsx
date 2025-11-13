import './LoginSingup.css'
import email_img from '../Assets/email.png'
import person_img from '../Assets/person.png'
import password_img from '../Assets/password.png'


const LoginSingup = () => {

    return (
        <body className='body'>
            <div className='container'>
                <div className="header">
                    <div className="text">Sign up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={person_img} alt="My name" />
                        <input type="text" placeholder='Name' />
                    </div>
                    <div className="input">
                        <img src={email_img} alt="My e-mail" />
                        <input type="email" placeholder='email' />
                    </div>
                    <div className="input">
                        <img src={password_img} alt="My password" />
                        <input type="password" placeholder='password' />
                    </div>
                    <div className="submit-container">
                        <div className="submit">Sign Up</div>
                        <div className="submit">Login</div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default LoginSingup







