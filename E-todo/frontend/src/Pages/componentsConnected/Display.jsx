import { useNavigate } from "react-router-dom";
import '../styles/Connected.css';


export default function Display({ id }) {
    const navigate = useNavigate(); 

    const InfoUser = () => {
        navigate(`/users/${id}`);
    };

    const Home = () => {
        navigate("/");
        localStorage.removeItem("token");
    };

    return (
        <ul className='menuSettings'>
            <li onClick={InfoUser} className="styleMenu">account</li>
            <li className="styleMenu">background</li>
            <li onClick={Home} className="styleMenu">Log out</li>
        </ul>
    );
}
