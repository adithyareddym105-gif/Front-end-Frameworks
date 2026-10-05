import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>
        Just a little movie app I built for class, using React + the TMDB API to
        pull real movie data.
      </p>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default AboutPage;
