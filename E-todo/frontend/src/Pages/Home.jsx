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
        <div>
            <header>
                <div>
                    <ButtonAnim ButtonRegister={goToRegister} ButtonLogin={goToLogin} />
                </div>
            </header>
            <main>
                <div className="box">
                    <div className="onBox">create your own todo-list</div>
                    <div className="onBox">gain time</div>
                    <div className="onBox">don't forget essencial things</div>
                </div>
            </main>
            <footer>
                <div>
                    <p>
                        Foundate by Sen-Sam & Kenan <br />
                        email : sen-sam.sam@epitech.eu <br />
                        email : kenan.lacrampe-cuyaubere-flieutete@epitech.eu <br />
                        address : 2 Pl. Louis Daubenton, 44100 Nantes
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

