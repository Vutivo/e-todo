import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TodoInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const STATUS_OPTIONS = ["not started", "todo", "in progress", "done"];


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const handleBack = () => {
        navigate("/user/todos");
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

            } catch (err) {
                console.error("Erreur :", err);
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

            <button>save</button>
            <button>delete</button>
            <button onClick={handleBack}>back</button>
        </div>
    );
}
