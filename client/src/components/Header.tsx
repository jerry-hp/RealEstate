import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state: any) => state.auth.user.user);
  console.log(user);

  return (
    <header className="bg-slate-700">
      <div className="max-w-6xl mx-auto p-3 flex justify-between">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-3xl flex flex-wrap items-center ">
            <span className="text-slate-300">Jerry</span>
            <span className="text-blue-300">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-200 rounded-xl flex items-center p-1 sm:p-2">
          <input className="bg-transparent w-24 sm:w-64 focus:outline-none " type="text" placeholder="Search..." />
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex items-center gap-2 text-slate-300">
          <Link to={"/"}>
            <li className="hidden sm:block">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:block">About</li>
          </Link>
          <Link to="/profil">{user ? <img className="w-8 h-8 rounded-full" src={user.image} alt="" /> : <li>Sign In</li>}</Link>
        </ul>
      </div>
    </header>
  );
}
