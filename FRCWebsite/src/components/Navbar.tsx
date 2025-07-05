import './Navbar.css';
import logo from '../../../../4015Website/4015Website/src/assets/Team4015logo.png';

function Navbar() {
    return(
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Company logo" />
                </div>
                <div className="nav-spacer"></div> {/* New spacer element */}
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Student</a></li>
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Sponsor</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="purple-1"></div>
            <div className="purple-2"></div>
        </>
    );
}

export default Navbar;