import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <h1>That page wasn't found, sorry!</h1>
      <br />
      <Link to="/">
        <h2>Back to the homepage?</h2>
      </Link>
    </div>
  );
}
