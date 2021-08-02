import "./Login.css";
import Button from "@material-ui/core/Button";
import { actionTypes } from "../reducer";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
const Login = () => {
const [{user},dispatch] = useStateValue()
    const signin = () => {
        auth.signInWithPopup(provider).then(result=>dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
        })).catch((err)=> alert(err.message))
    }
  return (
    <div className="login">
      <h1>Welcome to Flashcard App!</h1>
      <Button variant="contained" color="primary" onClick={signin}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;
