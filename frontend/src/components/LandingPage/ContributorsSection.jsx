import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../../styles/LandingPage.style.css";
import "../../styles/welcome.styles.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import cto from "../../assets/images/cto.png";

const contributors = [
  {
    name: "Dr. Wastna Alemayehu",
    imageUrl: cto,
    linkedin: "https://linkedin.com/in/dr-wastna-alemayehu-b560a0165",
    github: "https://github.com/Wasealex",
    description:
      "I am a Medical Doctor and a Software engineer who is enthusiastic about technology and build this portfolio project to showcase my skills.",
  },
];

const ContributorsSection = () => {
  return (
    <Container className="contributors-section">
      <hr className="welcome__hr" />
      <h2 className="text-center mb-4">Meet Our Contributors</h2>
      <Row className="justify-content-center">
        {contributors.map((contributor, index) => (
          <Col md={6} className="text-center mb-4" key={index}>
            <Card className="contributor-card">
              <Row>
                <Col md={4}>
                  <Image
                    src={contributor.imageUrl}
                    alt={`Contributor ${contributor.name}`}
                    roundedCircle
                    className="img-fluid mb-3"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{contributor.name}</Card.Title>
                    <Card.Text>{contributor.description}</Card.Text>
                    <div className="d-flex justify-content-center">
                      <a
                        href={contributor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${contributor.name}'s LinkedIn`}
                        className="me-3"
                      >
                        <FaLinkedin size={40} />
                      </a>
                      <a
                        href={contributor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${contributor.name}'s GitHub`}
                      >
                        <FaGithub size={40} />
                      </a>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ContributorsSection;
