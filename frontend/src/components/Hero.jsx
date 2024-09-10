import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Hero = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="text-center">
        <Card.Header>
          <h1>PharmaCart</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h2>Welcome to PharmaCart</h2>
          </Card.Title>
          <Card.Text>
            <h4>
              Your one-stop online pharmacy for all your medication needs.
            </h4>
            <p>
              Browse our wide range of medications, add them to your cart, and
              checkout securely.
            </p>
            <p>Track your orders and view your order history with ease.</p>
            <p>Sign up or log in to start shopping now!</p>
          </Card.Text>
          <LinkContainer to="/login">
            <Button variant="primary">Sign in</Button>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Button variant="primary" className="ms-3">
              Sign up
            </Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Hero;
