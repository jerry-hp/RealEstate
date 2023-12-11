import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/authSlice";
import Oauth from "../components/Oauth";

export default function SignIn() {
  const [signInData, setSignInData] = useState({});
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    setSignInData({
      ...signInData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await api.post("/sign-in", signInData);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error: any) {
      dispatch(loginFailure(error.response.data.message));
    }
  };

  return (
    <div className="p-3  max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-4 text-slate-700">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input onChange={handleChange} type="text" placeholder="email" id="email" className="p-2 rounded-lg focus:outline-slate-400" />
        <input onChange={handleChange} type="password" placeholder="password" id="password" className="p-2 rounded-lg focus:outline-slate-400" />
        <button disabled={loading} className="bg-slate-700 text-slate-200 p-2 uppercase rounded-lg hover:opacity-80 disabled:opacity-50">
          {loading ? "Loading..." : "Sign in"}
        </button>
        <Oauth />
      </form>
      <p className=" ">
        Doesn't have an account?{" "}
        <a href="/sign-up" className="text-slate-700">
          Sign up
        </a>
      </p>
      {error && <h3 className="text-amber-900 text-center">{error}</h3>}
    </div>
  );
}
