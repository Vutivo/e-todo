import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Connected.css';
import imgParams from './Assets/imgParametres.png';
import Display from './componentsConnected/Display';

const Connected = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const Open = () => setOpen(!open);
    const handleKeyDown = async (event, status) => {
        const value = event.target.value
        if (event.key == "Enter") {
            console.log(`Entrée pressée dans la colonne : ${status} : ${value}`);
            try {
                const res = await fetch("http://localhost:3000/todos", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ status,value })


                     

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
                if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                const data = await res.json();
                setUser(data.user);
                setTasks(data.tasks);
            } catch (err) {
                console.error("Erreur :", err);
            }
        };
        fetchUser();
    }, []);

    const renderTasks = (status) => {
        const filtered = tasks.filter(task => task.status === status);
        return filtered.length ? (
            filtered.map((task, i) => <p key={i}>{task.title}</p>)
        ) : <p>No tasks yet</p>;
    };

    return (
        <>
            <header>
                <div className='flex'>
                    <div>
                        {user ? (
                            <div>
                                <p>Welcome {user.name} {user.firstname || ''}</p>
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
                            <div>{status}</div><br />
                            <div>{renderTasks(status)}</div>
                            <input onKeyDown={(e) => handleKeyDown(e, status)} type="text" placeholder="Add task" />
                        </div>
                    ))}
                    <button className='NoInfo'>Create your 1st to do list</button>
                </div>
            </main>
        </>
    );
};

export default Connected;
