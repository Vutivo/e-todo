import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Connected.css';


const AllTodos = () => {
    const [open, setOpen] = useState(false);
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
                <div key={task.id} className="task-card">
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
                <div className='flex'>
                    <div>
                        <p> View All ToDo </p>
                    </div>
                </div>
            </header>

            <main>
                <button onClick={handleBack}>Back to todos</button>

                <div className='container1'>
                    {['not started', 'todo', 'in progress', 'done'].map(status => (
                        <div className='GotInfo' key={status}>
                            <h3>{status}</h3>
                            {renderTasks(status)}
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default AllTodos;
