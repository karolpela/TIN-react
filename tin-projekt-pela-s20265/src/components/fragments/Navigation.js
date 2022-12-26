import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">sg</Link>
        </li>
        <li>
          <Link to="/customers">cs</Link>
        </li>
        <li>
          <Link to="/rentals">rt</Link>
        </li>
        <li>
          <Link to="/equipment">eq</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
