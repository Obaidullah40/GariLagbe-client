import { useState, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        console.log(password);

        // Password Validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 6 characters long, and include both uppercase and lowercase letters."
            );
            return;
        } else {
            setError("");
        }

        // Create User
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        Swal.fire("Registration Successful!", "", "success");
                        navigate(`${location.state ? location.state : "/"}`);
                    })
                    .catch((error) => {
                        // console.error("Update error:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `Registered, but profile not fully updated. ${error.message}`
                        });
                        setUser(user);
                    });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops ",
                    text: `${error.message}`
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="label"><span className="label-text font-semibold">Name</span></label>
                        <input type="text" name="name" required className="input input-bordered w-full" placeholder="Your full name" />
                    </div>

                    <div>
                        <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
                        <input type="text" name="photo" required className="input input-bordered w-full" placeholder="Link to profile image" />
                    </div>

                    <div>
                        <label className="label"><span className="label-text font-semibold">Email</span></label>
                        <input type="email" name="email" required className="input input-bordered w-full" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="label"><span className="label-text font-semibold">Password</span></label>
                        <input type="password" name="password" required className="input input-bordered w-full" placeholder="At least 6 characters" />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="btn btn-primary w-full">Register</button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 font-semibold ml-1">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
