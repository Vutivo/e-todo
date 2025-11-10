import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); // On récupère la fonction de navigation

    const goToRegister = () => {
        navigate("/register"); 
    };
    const goToLogin = () => {
        navigate("/login"); 
    };

    return (
        <div>
            <button className="submit" onClick={goToRegister}>
                Register
            </button>
            <button className="submit" onClick={goToLogin}>
                Login
            </button>
        </div>

    );
};

export default Home;
