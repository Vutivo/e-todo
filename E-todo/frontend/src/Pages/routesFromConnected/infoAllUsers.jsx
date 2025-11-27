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

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Error fetching user:", res.status, errorData);
                    throw new Error(`HTTP Error: ${res.status}`);
                }

                const data = await res.json();

                setUserData(Array.isArray(data.users) ? data.users : []);
                console.log("Fetched todos:", data.users);

            } catch (err) {
                console.log(err)

            }

        }
        fetchUser()
    }, []);


    return <div>

        <h2>All Users</h2>
        <button className="button" onClick={handleBack}>Back to todos page</button>
        <div className="users-list">
            <table border={1} className="table">
                <thead>
                    <tr>
                        <td className="td">Id</td>
                        <td className="td">name</td>
                        <td className="td">firstname</td>
                        <td className="td"> email</td>
                        <td className="td">acount created date</td>
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

        </div>

    </div>
};

export default InfoAllUsers;