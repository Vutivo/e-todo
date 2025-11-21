import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/InfoUser.css';

export default function InfoUser() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // On récupère la fonction de navigation
    const backToConnected = () => {
        navigate(`/user/todos`);
    }
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await fetch("http://localhost:3000/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) throw new Error(`HTTP Error : ${res.status}`);
                const data = await res.json();
                console.log("Données reçues :", data);
                setUser(data.user); // change pour récupérer l'id
            } catch (err) {
                console.error(err);
                navigate("/login");
            }
        };

        fetchInfo();
    }, [navigate]);

    const deleteAccount = async () => {
        // Demande le mot de passe qu'on vérifie dans le back
        const password = window.prompt("Enter your password to valid your deletion");
        if (!password) return; // si annuler ou rien

        try {
            const res = await fetch("http://localhost:3000/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Your account is delete");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                alert(data.message || "Incorrect password, account not deleted.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error, please try again.");
        }
    };
    return (
        <>
            <header>
                <div className="flex">
                    <div>
                        <button onClick={backToConnected} className="button">come back to your todo list</button>
                    </div>
                    <div>
                    Personal userboard of {user ? user.firstname : "loading..."}
                    </div>
                </div>
            </header>
            <main className="main">
                <table className="table">
                    <thead>
                        <tr>
                            <td className="td">name</td>
                            <td className="td">firstname</td>
                            <td className="td">email</td>
                            <td className="td">account creation date</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="td">{user?.name}</td>
                            <td className="td">{user?.firstname}</td>
                            <td className="td">{user?.email}</td>
                            <td className="td">{user?.created_at.split("T")[0]}</td>
                        </tr>
                    </tbody>
                </table>
            </main>
            <div className="flex">
            <div><button className="button">update informations</button></div>
            <div><button onClick={deleteAccount} className="button">delete your account</button></div>
            </div>
        </>
    );
}
