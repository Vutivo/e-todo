import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/styleInfoUser.css";

export default function InfoUser() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        firstname: "",
        email: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const backToConnected = () => {
        navigate(`/user/todos`);
    };

    useEffect(() => {
    const fetchInfo = async () => {
        try {
            const res = await fetch(`http://localhost:3000/users/${id}`, {
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

            setUser(data.user);
            setFormData({
                name: data.user.name,
                firstname: data.user.firstname,
                email: data.user.email,
            });
        } catch (err) {
            console.error(err);
        }
    };

    fetchInfo();
}, [id, navigate]);


    const deleteAccount = async () => {
        const password = window.prompt("Enter your password to valid your deletion");
        if (!password) return;

        try {
            const res = await fetch(`http://localhost:3000/users/${id}`, {
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
                alert(data.message || "Incorrect password.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error, please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const password = window.prompt("Enter your password to valid your modifications");
        const email = formData.email;
        if (!password) return;
        if (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))) {
            alert('please enter valid email')
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ ...formData, password }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Account updated");

                setUser({ ...user, ...formData });
                setIsEditing(false);
            } else {
                alert(data.message || "Update failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };
    const viewAllUsers = () => {
        navigate("/user");
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            firstname: user.firstname,
            email: user.email,
        });
        setIsEditing(false);
    };

    if (!user) return <p>Loading...</p>;

    return (
        <>
            <header>
                <div className="UserTodosHeader">
                    <div>
                        <button onClick={backToConnected} className="button">
                            come back to your todo list
                        </button>
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
                            <td className="td">
                                {isEditing ? (
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>

                            <td className="td">
                                {isEditing ? (
                                    <input
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.firstname
                                )}
                            </td>

                            <td className="td">
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>

                            <td className="td">{user.created_at.split("T")[0]}</td>
                        </tr>
                    </tbody>
                </table>
            </main>

            <div className="buttonUserInfo">
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="button">
                        update informations
                    </button>
                ) : (
                    <>
                        <button onClick={handleSave} className="button">
                            save
                        </button>
                        <button onClick={handleCancel} className="button">
                            cancel
                        </button>
                    </>
                )}

                <button className="button" onClick={viewAllUsers}>
                    view all users
                </button>

                <button onClick={deleteAccount} className="button">
                    delete your account
                </button>
            </div>
        </>
    );
}
