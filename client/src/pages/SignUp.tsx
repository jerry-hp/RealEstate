import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setSignUpData({
      ...signUpData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/sign-up", signUpData);
      setError(res.data.message);
      setIsLoading(false);
      navigate("/sign-in");
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3  max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-4 text-slate-700">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input onChange={handleChange} type="text" placeholder="username" id="username" className="p-2 rounded-lg focus:outline-slate-400" />
        <input onChange={handleChange} type="text" placeholder="email" id="email" className="p-2 rounded-lg focus:outline-slate-400" />
        <input onChange={handleChange} type="password" placeholder="password" id="password" className="p-2 rounded-lg focus:outline-slate-400" />
        <button disabled={isLoading} className="bg-slate-700 text-slate-200 p-2 uppercase rounded-lg hover:opacity-80 disabled:opacity-50">
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <Oauth />
      </form>
      <p className=" ">
        Already have an account?{" "}
        <a href="/sign-in" className="text-slate-700">
          Sign In
        </a>
      </p>
      {error && <h3 className="text-amber-900 text-center">{error}</h3>}
    </div>
  );
}
