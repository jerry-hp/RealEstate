import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./../firebase";
import { api } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOauth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await api.post("/google", {
        username: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type="button" onClick={handleOauth} className="bg-red-700 text-white rounded-lg p-2 hover:opacity-90">
      SIGN IN WITH GOOGLE
    </button>
  );
}
