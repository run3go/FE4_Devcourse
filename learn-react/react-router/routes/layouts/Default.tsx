import { Link, Outlet } from "react-router";

export default function Default() {
  return (
    <>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/custom-about/about">About</Link>
        </li>
      </nav>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </>
  );
}
