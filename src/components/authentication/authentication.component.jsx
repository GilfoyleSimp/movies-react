import '../authentication/authentication.styles.css';
import { auth, googleProvider } from '../../firebase';
import {createUserWithEmailAndPassword,
        signInWithPopup,
        signInWithEmailAndPassword
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
            await signInWithEmailAndPassword(auth, email, password);
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
        <div  className='auth-container'>

            <form className='form-container'>
                <h2>SIGN IN</h2><hr/>
                <div class="mb-3 ">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="form-label">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword6" class="form-control" aria-labelledby="passwordHelpInline" />
                    </div>
                </div>
                <div className='auth-buttons'>
                    <button onClick={signIn} type="button" style={{color:'#956308e0'}} class="btn btn-outline-warning">Sign In</button>
                    <button onClick={signInWithGoogle} type="button" class="btn btn-outline-primary">Google Sign In</button>
                </div>
            </form>

            <form className='form-container'>
                <h2>SIGN UP</h2><hr/>
                <div class="mb-3 ">
                    <label for="exampleFormControlInput1" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" />
                </div>
                <div class="mb-3 ">
                    <label for="exampleFormControlInput1" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" />
                </div>
                <div class="mb-3 ">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" />
                </div>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="form-label">Password</label>
                        <input type="password" id="inputPassword6" class="form-control" aria-labelledby="passwordHelpInline" />
                    </div>
                </div>
                <div className='auth-buttons'>
                    <button type="button" style={{color:'#956308e0'}} class="btn btn-outline-warning">Sign Up</button>
                </div>
            </form>
            
        </div>
    )
}

export default Authentication;