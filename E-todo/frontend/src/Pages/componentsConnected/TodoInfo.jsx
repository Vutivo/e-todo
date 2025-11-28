import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/styleTodo.css";

export default function TodoInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const STATUS_OPTIONS = ["not started", "todo", "in progress", "done"];


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const backToConnected = () => {
        navigate(`/user/todos`);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    due_time: dueTime
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Updated todo:", data);
            navigate("/user/todos");
        } catch (err) {
            console.error("Erreur :", err);
        }

    };

    const handleBack = () => {
        navigate("/user/todos");
    };
    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
            navigate("/user/todos");

        }
        catch (err) {
            console.error("Erreur :", err);
        }
    };

    useEffect(() => {
        const Info = async () => {
            try {
                const res = await fetch(`http://localhost:3000/todos/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);

                const data = await res.json();
                console.log(data);

                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
                setDueTime(data.due_time ? data.due_time.split("T")[0] : "");
                setCreatedAt(data.created_at);

            } catch (err) {
                console.error("Erreur :", err);
                navigate("/user/todos");
            }
        };

        Info();
    }, [id, navigate]);


    return (
        <>
            <header>
                <div>
                    <button className="button" onClick={backToConnected} >Back to your todo list</button>
                </div>
            </header>
            <main>
                <div className="AreaForTodo">
                    <div className="placeForTodo">
                        <p>Title :</p>
                        <input
                            className="areaForText"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="placeForTodo itemForTodo2">
                        <p>Description :</p>
                        <textarea
                            className="descriptionTextarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="placeForTodo">
                        <p>Status :</p>
                        <select
                            className="areaForText"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="placeForTodo">
                        <p>Due time : </p>
                        <input
                            type="date"
                            className="areaForText"
                            value={dueTime}
                            onChange={(e) => {
                                setDueTime(e.target.value);
                            }}
                        />
                    </div>
                    <div className="placeForTodo">
                        <p>Created At:</p>
                        <div>
                            <p> {new Date(createdAt).toDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="buttonUserInfo">
                    <div>
                        <button className="button" onClick={handleSave}>save</button>
                    </div>
                    <div>
                        <button className="button" onClick={handleDelete}>delete</button>
                    </div>
                    <div>
                        <button className="button" onClick={handleBack}>back</button>
                    </div>
                </div>
            </main>
        </>
    );
}
