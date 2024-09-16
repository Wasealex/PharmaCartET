import IntroSection from "./LandingPage/IntroSection";
import FeaturesSection from "./LandingPage/FeaturesSection";
import ContributorsSection from "./LandingPage/ContributorsSection";
import "../styles/LandingPage.style.css"; // Import consolidated styles

const LandingPage = () => {
  return (
    <>
      <IntroSection />
      <FeaturesSection />
      <ContributorsSection />
    </>
  );
};

export default LandingPage;
