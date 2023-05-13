import '../authentication/authentication.styles.css';
import { auth, googleProvider } from '../../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useState, useContext } from "react";
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from "react-router-dom";


const Authentication = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setCurrentUser } = useContext(UserContext)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          setCurrentUser(auth.currentUser)
          navigate("/")
        } catch (err) {
          console.error(err);
        }
      };

    
    console.log(auth.currentUser)

    return (
        <div>
            <input
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}> Sign In</button>

            <button onClick={signInWithGoogle}> Sign In With Google</button>


            <form>
                <input type='email'></input>
                <input type='password'></input>
                <button>Sign up with Email</button>
                <button>Sign up with Google</button>
            </form>

        </div>
    )
}

export default Authentication;