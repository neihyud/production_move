import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const NavbarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => {
        return logoutUser();
    };

    return (
        <Navbar expand="lg" bg="info" variant="dark" className="shadow">
            <Navbar.Brand className="font-weight-bolder text-white">
                <img
                    src={learnItLogo}
                    alt="learnItLogo"
                    width="32"
                    height="32"
                    className="ms-4"
                />
                LearnIt
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/dashboard"
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/about"
                        as={Link} // hoat dong nhu link trong bootstrap
                    >
                        About
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        disabled
                    >
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant="danger "
                        className="font-weight-bolder text-white me-4"
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt="logoutIcon"
                            width="24"
                            height="24"
                            className="me-2"
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarMenu;
