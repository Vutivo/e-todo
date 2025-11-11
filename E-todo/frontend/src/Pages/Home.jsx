import { useNavigate } from "react-router-dom";
import "./Home.css";
import ButtonAnim from "./componentHome/ButtonAnim";

const Home = () => {
    const navigate = useNavigate(); // On récupère la fonction de navigation

    const goToRegister = () => {
        navigate("/register"); 
    };
    const goToLogin = () => {
        navigate("/login"); 
    };
    
    return (
        <div className="box">
            <ButtonAnim ButtonRegister={goToRegister} ButtonLogin={goToLogin} />
        </div>

    );
};

export default Home;

