import { Container, Card, Button } from "react-bootstrap";

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
          <Button variant="primary" href="/signin" className="ms-3">
            Sign in
          </Button>
          <Button variant="primary" href="/signup" className="ms-3">
            Sign up
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Hero;
