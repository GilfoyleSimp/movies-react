import '../navigation/navigation.styles.css';
import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                {currentUser ? (
                    <button onClick={logout}> Logout </button>
                ) : <Link to='/auth'>SignIn</Link>}

                {currentUser ? (

                    <div>
                        <h4>{currentUser.displayName}</h4>
                        <img alt='User display pic' src={currentUser.photoUrl} style={{ width: '40px', height: '40px' }} />
                    </div>
                ) : null}

            </div>
            <div className="btn-group">
                <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" >Movie Watch List</button></li>
                    <li><button className="dropdown-item" >Another action</button></li>
                    <li><button className="dropdown-item" >Something else here</button></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><button onClick={logout} className="dropdown-item" href="#">LogOut</button></li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}

export default Navigation;


