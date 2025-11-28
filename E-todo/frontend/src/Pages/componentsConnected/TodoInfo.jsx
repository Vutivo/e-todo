import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const STATUS_OPTIONS = ["not started", "todo", "in progress", "done"];


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [createdAt, setCreatedAt] = useState("");

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

            const data = await res.json();

            if (!res.ok) {
                if (data.tokensuccess === false) {
                    console.log("Token invalid, redirecting to login.");
                    navigate("/login");
                    return;
                }
                throw new Error(`HTTP Error: ${res.status}`);
            }
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
    }, [id]);


    return (
        <div>
            <p>Title :</p>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <p>Description :</p>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <p>Status :</p>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>
            <p>Due time : </p>
            <input
                type="date"
                value={dueTime}
                onChange={(e) => {
                    setDueTime(e.target.value);
                }}
            />


            <p>Created At: {new Date(createdAt).toDateString()}</p>



            <button onClick={handleSave}>save</button>
            <button onClick={handleDelete}>delete</button>
            <button onClick={handleBack}>back</button>
        </div>
    );
}
