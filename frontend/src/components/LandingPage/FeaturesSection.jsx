import { Container, Row, Col, Card, Image } from "react-bootstrap";

import "../../styles/LandingPage.style.css"; // Import consolidated styles
import imagePharma from "../../assets/images/bg07.png";
import featureImage1 from "../../assets/images/FT01.png";
import featureImage2 from "../../assets/images/FT03.png";
import featureImage3 from "../../assets/images/FT05.png";
import featureImage4 from "../../assets/images/FT02.png";
import featureImage5 from "../../assets/images/bg09.png";

const FeaturesSection = () => {
  const features = [
    {
      title: "Wide Range of Medications",
      description: "Browse our extensive selection of medications.",
      image: featureImage1,
    },
    {
      title: "Secure Checkout",
      description: "Your transactions are secure and hassle-free.",
      image: featureImage4,
    },
    {
      title: "Tailored Just for You",
      description:
        "Enjoy a unique shopping experience designed around your preferences. From recommended products to saved searches, our platform learns what you need, making every visit smoother and faster!",
      image: featureImage3,
    },
    {
      title: "Affordable Prices",
      description:
        "Choose from a variety of secure payment methods, including local options tailored to your needs. Our integrated payment system ensures your transactions are safe, fast, and hassle-free—so you can focus on your health!",
      image: featureImage2,
    },
    {
      title: "Hassle-Free Prescription Management",
      description:
        "Upload your prescriptions effortlessly with our user-friendly interface. Simply snap a photo or upload a file, and we’ll handle the rest. It’s that easy to get your medications delivered right to your door!",
      image: featureImage1,
    },
    {
      title: "Find Your Medications Instantly",
      description:
        "Navigate our extensive database of medications with ease! Our powerful search feature allows you to quickly find exactly what you need, whether it's prescription or over-the-counter. Say goodbye to long waits and hello to convenience!",
      image: featureImage5,
    },
  ];

  return (
    <Container className="features-section">
      <hr className="welcome__hr" />
      <img className="features-image" src={imagePharma} alt="Features" />
      <Row>
        {features.map((feature, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="feature-card">
              <Image
                src={feature.image}
                alt={feature.title}
                fluid
                className="feature-card-img"
              />
              <Card.Body>
                <Card.Title className="feature-card-title">
                  {feature.title}
                </Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturesSection;
