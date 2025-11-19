import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Connected.css';
import imgParams from './Assets/imgParametres.png';
import Display from './componentsConnected/Display';

const Connected = () => {

    const { userId } = useParams();                         // Récupération de l'ID dans l'URL
    const [open, setOpen] = useState(false);                // Pour settings qui s'ouvre
    const [user, setUser] = useState(null);                 // Pour changement d'utilisateur
    const [tasks, setTasks] = useState([]);

    
    const Open = () => {
        setOpen(!open);
    };
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/Connected/${userId}`);
                if (!res.ok) {
                    throw new Error(`Erreur HTTP : ${res.status}`);
                }
                
                var data = await res.json();
                console.log(data.user);
                console.log(data.tasks);
                setUser(data.user);
                setTasks(data.tasks);
                
            } catch (err) {
                console.error("Erreur :", err);
            }
        };
        
        fetchUser();
    }, [userId]);
    const renderTasks = (status) => {
        const task = tasks.filter(task => task.status === status);
        return task.length ? (
            task.map((task, index) => <p key={index}>{task.description}</p>)
        ) : (
            <p>No tasks yet</p>
        );
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
                    <div className='GotInfo'>
                        <div>not started </div><br />
                        <div>
                            {renderTasks('not started')}
                        </div>
                    </div>
                    <div className='GotInfo'><div>todo </div><br />
                        <div>
                            {renderTasks('todo')}
                        </div>
                    </div>
                    <div className='GotInfo'> <div>in progress</div><br />
                        <div>
                            {renderTasks('in progress')}
                        </div>
                    </div>
                    <div className='GotInfo'> <div>done</div><br />
                        <div>
                            {renderTasks('done')}
                        </div>
                    </div>

                    <button className='NoInfo'>Create your 1st to do list</button>
                </div>
            </main>

        </>
    );
};

export default Connected;
