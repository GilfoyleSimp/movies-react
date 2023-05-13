import '../navigation/navigation.styles.css';
import { Link, Outlet } from 'react-router-dom';

const Navigation = () => {

    return (
        <div>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Navigation;


