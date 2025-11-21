import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Connected.css';
import imgParams from './Assets/imgParametres.png';
import Display from './componentsConnected/Display';

const Connected = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);                // Pour settings qui s'ouvre
    const [user, setUser] = useState(null);                 // Pour changement d'utilisateur
    const [tasks, setTasks] = useState([]);                 // Récupération des status, titres et descriptions

    const Open = () => {
        setOpen(!open);
    };
    const handleClick = async (id) => {
        navigate(`/todos/${id}`)
    }

    const handleKeyDown = async (event, status) => {
        const value = event.target.value
        if (event.key == "Enter") {
            console.log(`Entrée pressée dans la colonne : ${status} : ${value}`);
            try {
                const res = await fetch("http://localhost:3000/todos", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ status, value })




                });
                if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                const data = await res.json();
                setTasks(prevTasks => [...prevTasks, data]);
                event.target.value = "";

            } catch (err) {
                console.error("Erreur :", err);
            }
        }

    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:3000/user/todos", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`Erreur HTTP : ${res.status}`);
                }

                const data = await res.json();
                console.log(data.user);
                console.log(data.tasks);

                setUser(data.user);
                setTasks(data.tasks);

            } catch (err) {
                console.error("Erreur :", err);
                navigate("/login"); // Tu peux rediriger si token invalid
            }
        };

        fetchUser();
    }, []);

const renderTasks = (status) => {
    const filtered = tasks.filter(task => task.status === status);
    return filtered.length ? (
        filtered.map((task, i) =>
            <div>
                <p key={i}>{task.title}</p>
                <button onClick={() => handleClick(task.id)}>view</button>
            </div>)
    ) : <p>No tasks yet</p>;
};


return (
    <>
        <header>
            <div className='flex'>
                <div>
                    {user ? (
                        <div>
                            <p>Welcome {user.name} {user.firstname}</p>
                        </div>
                    ) : (
                        <p>Load...</p>
                    )}
                </div>
                <div>
                    <button className='settings'>
                        <img className="settings" src={imgParams} alt='Settings' onClick={Open} />
                    </button>

                    {open && <Display />}
                </div>
            </div>
        </header>
        <main>
            <div className='container1'>
                {['not started', 'todo', 'in progress', 'done'].map((status) => (
                    <div className='GotInfo' key={status}>
                        <div>{status}</div>

                        <div>{renderTasks(status)}</div>
                        <input onKeyDown={(e) => handleKeyDown(e, status)} type="text" placeholder="Add task" />
                    </div>
                ))}
            </div>
        </main>

    </>
);
    };
export default Connected;