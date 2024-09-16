import { Container, Row, Col } from "react-bootstrap";
import "../../styles/LandingPage.style.css"; // Import consolidated styles
import imagePharma from "../../assets/images/bg07.png";

const FeaturesSection = () => {
  const features = [
    {
      title: "Wide Range of Medications",
      description: "Browse our extensive selection of medications.",
    },
    {
      title: "Secure Checkout",
      description: "Your transactions are secure and hassle-free.",
    },
    {
      title: "Order Tracking",
      description: "Easily track your orders and view your history.",
    },
  ];

  return (
    <Container className="features-section">
      <hr className="welcome__hr" />
      <img className="features-image" src={imagePharma} alt="Features" />
      {features.map((feature, index) => (
        <Row
          key={index}
          className={index % 2 === 0 ? "bg-light" : "bg-secondary text-dark"}
        >
          <hr className="welcome__hr" />
          <Col md={12}>
            <hr className="welcome__hr" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Col>
          <hr className="welcome__hr" />
        </Row>
      ))}
    </Container>
  );
};

export default FeaturesSection;
