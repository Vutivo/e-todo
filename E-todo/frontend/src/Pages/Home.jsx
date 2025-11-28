import { useNavigate } from "react-router-dom";
import "./styles/styleHomePages.css";
import ButtonAnim from "./componentHome/ButtonAnim";
import ImageOfAllUserTodos from "./Assets/ImagesHomePage/ImageOfAllUserTodos.png";
import ImageOfCreatingTodo from "./Assets/ImagesHomePage/ImageOfCreatingTodo.png";
import ImageOfDurian from "./Assets/ImagesHomePage/ImageOfDurian.png"
const Home = () => {
    const navigate = useNavigate(); // On récupère la fonction de navigation

    const goToRegister = () => {
        navigate("/register");
    };
    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="Homebody">
            <header>
                <div>
                    <ButtonAnim ButtonRegister={goToRegister} ButtonLogin={goToLogin} />
                </div>
            </header>
            <main>
                <div className="HomeBox">
                    <img className="HomeOnBox" src={ImageOfCreatingTodo} alt="Image of the website" />
                    <img className="HomeOnBox" src={ImageOfDurian} alt="Image of durian team" />
                </div>
                <div className="HomeBox">
                    <img className="HomeOnBox2" src={ImageOfAllUserTodos} alt="Image of the website" />
                </div>
            </main>
            <footer>
                <div>
                    <p>
                        Made by Sen-Sam & Kenan <br />
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

