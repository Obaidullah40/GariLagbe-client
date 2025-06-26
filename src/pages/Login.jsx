import React, { use, useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { loginUser, googleSignIn } = use(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(res => {
        Swal.fire("Login Successful!", "", "success");
        navigate(from, { replace: true });
      })
      .catch(err => {
        console.error(err);
        setError("Invalid email or password.");
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        Swal.fire("Logged in with Google!", "", "success");
        navigate(from, { replace: true });
      })
      .catch(err => {
        console.error(err);
        setError("Google sign-in failed.");
      });
  };

  return (
    <div className="py-10 flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login to GariLagbe</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              className="input input-bordered w-full"
              placeholder="********"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          <FcGoogle className="text-xl mr-2" /> Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <Link to="/register" className="text-blue-600 font-semibold ml-1">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;