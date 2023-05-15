import '../navigation/navigation.styles.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='my-nav-container'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" id='nav-container'>
                <div class="container-fluid">
                    <Link class="navbar-brand" style={{fontWeight:'bold'}} to='/'>myIMDB</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <div class="nav-link active" aria-current="page">
                                    <Link className='my-nav-link' to='/watchlist'>Watch List</Link>
                                </div>
                            </li>

                        </ul>
                        <li style={{ float: 'right' }} class="nav-item">
                            <div class="nav-link active" aria-current="page">
                                <Link className='my-nav-link' to='/about'>About</Link>
                            </div>
                        </li>
                        {currentUser ? (
                            <li style={{ float: 'right' }} class="nav-item">
                                <div style={{ cursor: 'pointer' }} class="nav-link active" aria-current="page">
                                    <div onClick={logout} className='my-nav-link' to='/auth'>LogOut</div>
                                </div>
                            </li>
                        ) : <li style={{ float: 'right' }} class="nav-item">
                            <div class="nav-link active" aria-current="page">
                                <Link className='my-nav-link' to='/auth'>Sign In</Link>
                            </div>
                        </li>}
                        
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default Navigation;


