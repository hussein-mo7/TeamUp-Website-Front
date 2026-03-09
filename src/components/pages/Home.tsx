import {
  MainSection,
  FeaturesSection,
  VisionSection,
  ProcessSection,
  ContactSection,
} from "../sections/home";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <MainSection />
      <FeaturesSection />
      <VisionSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
};

export default Home;
