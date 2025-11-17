import { useEffect, useState } from "react";

export default function NotStartedInfo({ userId }) {
    const [todo, setTodo] = useState("");

useEffect(() => {
    const fetchTodo = async () => {
        try {
            const res = await fetch(`http://localhost:3000/Connected/${userId}`);
            if (!res.ok) {
                throw new Error(`Erreur HTTP : ${res.status}`);
            }
            
            const data = await res.json();
            setTodo(data);
        } catch (err) {
            console.error("Erreur :", err);
        }
    };

    fetchTodo();
}, [userId]);


    return (
        <div>
            {todo ? (
                <>
                    <div>
                        <p>title : {todo.title}</p>
                    </div>
                    <div>
                        {todo.description}
                    </div>
                </>
            ) : (
                <p>Load...</p>
            )}
        </div>
    );
}