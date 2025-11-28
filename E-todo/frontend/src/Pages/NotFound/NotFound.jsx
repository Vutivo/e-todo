import '../styles/NotFound.css';
import { useNavigate } from "react-router-dom";
import ImgOfDurian from '../Assets/ImagesHomePage/ImageOfDurian.png'


const NotFound = () => {
    const navigate = useNavigate();
    const ComeBackHome = () => {
        navigate("/");
    };
    return (
        <>
            <div className="notfound-container">
                <img className="sizeOfDurian" src={ImgOfDurian} alt="Image of Durian's team" />
                <h1 className="notfound-title">404 - Page Not Found</h1>
                <p className="notfound-message">Sorry, the page you are looking for does not exist.</p>
                <button onClick={ComeBackHome} className='button'>Back to Home Page</button>
                <img className="sizeOfDurian2" src={ImgOfDurian} alt="Image of Durian's team" />
            </div>
        </>
    );
}
export default NotFound;