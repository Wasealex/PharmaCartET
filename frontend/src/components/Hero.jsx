import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Hero = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="text-center">
        <Card.Header>PharmaCart</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to PharmaCart</Card.Title>
          <Card.Text>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
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
