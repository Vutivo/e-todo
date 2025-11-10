import './LoginSingup.css'
import email_img from '../Assets/email.png'
import person_img from '../Assets/person.png'
import password_img from '../Assets/password.png'


const LoginSingup = () => {

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Sign up</div>
                <div className="underline"></div>
            </div>
            
            <div className="inputs">
                <div className="inuput">
                    <img src={person_img} alt="My name" />
                    <input type="text"  />
                </div>
                <div className="inuput">
                    <img src={email_img} alt="My e-mail" />
                    <input type="email"  />
                </div>
                <div className="inuput">
                    <img src={password_img} alt="My password" />
                    <input type="password"  />
                </div>
                <div className="forgot-password">Lost password ? <span>Click Here</span></div>
                <div className="submit-container">
                    <div className="submit">Sing Up</div>
                    <div className="submit">Login</div>
                </div>
            </div>



        </div>
    )
}

export default LoginSingup







