import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul style={{
        display: "flex",
        gap: "1rem",
        listStyle: "none",
        padding: "1rem",
        background: "#f0f0f0"
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