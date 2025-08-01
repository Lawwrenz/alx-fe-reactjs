import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul style={{
        display: "flex",
        justifyContent: "center", // Added missing property
        gap: "1rem",
        listStyle: "none",
        padding: "1rem",
        backgroundColor: "#f0f0f0", // Changed from 'background' to 'backgroundColor'
        margin: 0 // Added for better spacing
      }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}