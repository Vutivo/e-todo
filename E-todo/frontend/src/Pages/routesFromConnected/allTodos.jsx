import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/styleConnected.css';

const AllTodos = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/user/todos");
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("http://localhost:3000/todos", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    if (data.tokensuccess === false) {
                        console.log("Token invalid, redirecting to login.");
                        navigate("/login");
                        return;
                    }
                    throw new Error(`HTTP Error: ${res.status}`);
                }


                // Make sure tasks is always an array
                setTasks(Array.isArray(data.tasks) ? data.tasks : []);
                console.log("Fetched todos:", data.tasks);

            } catch (err) {
                console.error("Error fetching todos:", err);
                setTasks([]);
            }
        };

        fetchTodos();
    }, []);

    const renderTasks = (status) => {
        const filtered = tasks.filter(task => task?.status === status);
        return filtered.length ? (
            filtered.map(task => (
                <div 
                    key={task.id}>
                    <br />
                    <p>Title : {task.title}</p>
                    <p>By : {task.name} {task.firstname}</p>
                </div>
            ))
        ) : (
            <p>No tasks in {status}</p>
        );
    };

    return (
        <>
            <header>
                <div className='UserTodosHeader'>
                    <button className="button" onClick={handleBack}>Back to your todos list</button>
                </div>
            </header>

            <main>
                <div className="flexAllTodo">
                    <div className='containerAllTodo'>
                        {['not started', 'todo', 'in progress', 'done'].map(status => (
                            <div
                                className={
                                    'placeForAllTodo ' +
                                    ((status === 'not started' ? 'itemForAllTodo1' : '')||(status === 'todo' ? 'itemForAllTodo2' : ''))
                                }
                                key={status}
                            >
                                <h3>{status}</h3>
                                {renderTasks(status)}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default AllTodos;
