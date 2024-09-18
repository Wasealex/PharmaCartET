import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/LandingPage.style.css"; // Import consolidated styles
import "../../styles/welcome.styles.css";
const IntroSection = () => {
  return (
    <Container fluid className="intro-section">
      <div className="intro-content">
        <h1>PharmaCart</h1>
        <p>Your one-stop online pharmacy for all your medication needs.</p>
        <div className="intro-buttons">
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default IntroSection;
