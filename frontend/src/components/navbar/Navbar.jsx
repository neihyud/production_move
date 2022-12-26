import './navbar.css';

export default function Navbar({title}) {
    if (!title) title = "Dashboard"
    return (
        <div className="navbar">
            {title}
        </div>
    );
}
