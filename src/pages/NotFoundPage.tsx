import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Hmm, this page was not found.</p>
      <Link to="/">Take me home</Link>
    </div>
  );
}

export default NotFoundPage;
