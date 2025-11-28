import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoAllUsers = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState([]);
    const handleBack = () => {
        navigate("/user/todos");
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
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

                setUserData(Array.isArray(data.users) ? data.users : []);
                console.log("Fetched todos:", data.users);

            } catch (err) {
                console.log(err)

            }

        }
        fetchUser()
    }, []);


    return <>
        <header>
            <div className="UserTodosHeader">
                <h2>All Users</h2>
                <button className="button" onClick={handleBack}>Back to todos page</button>
            </div>
        </header>
        <main className="main">
            <div className="users-list">
                <table border={1} className="table">
                    <thead>
                        <tr>
                            <td className="td">Id</td>
                            <td className="td">name</td>
                            <td className="td">firstname</td>
                            <td className="td">email</td>
                            <td className="td">account creation date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.id}>
                                <td className="td">{user.id}</td>
                                <td className="td">{user.name}</td>
                                <td className="td">{user.firstname}</td>
                                <td className="td">{user.email}</td>
                                <td className="td">{user.created_at.split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div >
        </main>



    </>
};

export default InfoAllUsers;