import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="text-center" style={{ width: "30rem" }}>
        <Card.Header>
          <h1 className="display-4">PharmaCart</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h2 className="text-primary">Welcome to PharmaCart</h2>
          </Card.Title>
          <Card.Text>
            <Row>
              <Col md={12}>
                <p className="lead">
                  Your one-stop online pharmacy for all your medication needs.
                </p>
              </Col>
              <Col md={12}>
                <p>
                  Browse our wide range of medications, add them to your cart,
                  and checkout securely.
                </p>
              </Col>
              <Col md={12}>
                <p>Track your orders and view your order history with ease.</p>
              </Col>
              <Col md={12}>
                <p>Sign up or log in to start shopping now!</p>
              </Col>
            </Row>
          </Card.Text>
          <Row className="justify-content-center">
            <Col md={6}>
              <LinkContainer to="/login">
                <Button variant="primary" size="lg" block>
                  Sign in
                </Button>
              </LinkContainer>
            </Col>
            <Col md={6}>
              <LinkContainer to="/signup">
                <Button variant="primary" size="lg" block>
                  Sign up
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Hero;
