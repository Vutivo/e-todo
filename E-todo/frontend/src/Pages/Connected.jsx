import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/styleConnected.css";
import imgParams from './Assets/imgParametres.png';
import Display from './componentsConnected/Display';

const Connected = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const [inputValues, setInputValues] = useState({
        'not started': { title: '', description: '', due_time: '' },
        'todo': { title: '', description: '', due_time: '' },
        'in progress': { title: '', description: '', due_time: '' },
        'done': { title: '', description: '', due_time: '' },
    });

    const toggleOpen = () => setOpen(!open);

    const handleClick = (id) => {
        navigate(`/todos/${id}`);
    };

    const handleAllTodos = () => {
        navigate("/todo/all");
    }

    const handleClickButton = async (event, status) => {
        event.preventDefault();
        const { title, description, due_time } = inputValues[status];

        if (!title || !description || !due_time) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/todos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ status, title, description, due_time })
            });

            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

            const data = await res.json();
            setTasks(prevTasks => [...prevTasks, data]);

            // reset inputs
            setInputValues(prev => ({
                ...prev,
                [status]: { title: '', description: '', due_time: '' }
            }));

            setError(null);
        } catch (err) {
            console.error("Error:", err);
            setError("Unable to add task");
        }
    };

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
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const renderTasks = (status) => {
        const filtered = tasks.filter(task => task.status === status);

        return filtered.length ? (
            filtered.map((task) =>
                <div className="TodosCardConnected" key={task.id}>
                    <p>{task.title}</p>
                    <button className="buttonConnected" onClick={() => handleClick(task.id)}>View</button>
                </div>
            )
        ) : (
            <p className="TodosCardConnected">No tasks yet</p>
        );
    };

    return (
        <>
            <header>
                <div className='UserTodosHeader'>
                    <button className="buttonConnectedHeader"onClick={handleAllTodos}>View todo of everyone</button>
                    <div>
                        {user ? (
                            <p>Welcome {user.name} {user.firstname || ""}</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div>
                        <button className='settings'>
                            <img
                                className="settings"
                                src={imgParams}
                                alt='Settings'
                                onClick={toggleOpen}
                            />
                        </button>
                        {open && <Display  id={user?.id}/>}
                    </div>
                </div>
            </header>

            <main>
                <div className='containerConnected'>
                    {['not started', 'todo', 'in progress', 'done'].map((status) => (
                        <div className='containerTodosConnected' key={status}>
                            <div>{status}</div>
                            <br />

                            <div>{renderTasks(status)}</div>

                            <form className="form" onSubmit={(e) => handleClickButton(e, status)}>
                                <p>Title</p>
                                <input
                                    type="text"
                                    className="sizeInputTitle"
                                    placeholder="Title"
                                    required
                                    value={inputValues[status].title}
                                    onChange={(e) =>
                                        setInputValues(prev => ({
                                            ...prev,
                                            [status]: { ...prev[status], title: e.target.value }
                                        }))
                                    }
                                />

                                <p>Description</p>
                                <textarea
                                    className="descriptionTextarea"
                                    placeholder="Description"
                                    required
                                    value={inputValues[status].description}
                                    onChange={(e) =>
                                        setInputValues(prev => ({
                                            ...prev,
                                            [status]: { ...prev[status], description: e.target.value }
                                        }))
                                    }
                                />

                                <p>Due time :</p>
                                <input
                                    type="date"
                                    required
                                    value={inputValues[status].due_time}
                                    onChange={(e) =>
                                        setInputValues(prev => ({
                                            ...prev,
                                            [status]: { ...prev[status], due_time: e.target.value }
                                        }))
                                    }
                                />

                                <p>{error}</p>
                                <button className="buttonConnected" type="submit">Send</button>
                            </form>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Connected;
