import { useEffect, useState } from "react";

export default function NameInfo({ userId }) {
    const [user, setUser] = useState(null);

useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/Connected/${userId}`);
            if (!res.ok) {
                throw new Error(`Erreur HTTP : ${res.status}`);
            }
            
            const data = await res.json();
            console.log(data)
            setUser(data);
        } catch (err) {
            console.error("Erreur :", err);
        }
    };

    fetchUser();
}, [userId]);


    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome {user.user.name} {user.user.firstname}</p>
                </div>
            ) : (
                <p>Load...</p>
            )}
        </div>
    );
}