import { useNavigate } from "react-router-dom";
import '../Connected.css';


export default function Display() {
    const navigate = useNavigate(); // On récupère la fonction de navigation

    const InfoUser = () => {
        navigate("/user");
    }
    const Home = () => {
        navigate("/");
        localStorage.removeItem("token");
    }


    return (<ul className='menuSettings'>
                            <li onClick={InfoUser} className="styleMenu">account</li>
                            <li className="styleMenu">background</li>
                            <li onClick={Home} className="styleMenu">Log out</li>
                        </ul>)
}