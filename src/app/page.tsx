// src/app/page.tsx
import { MainLayout } from "@/components/layout";
import { Home } from "@/components/pages";

const HomePage = () => {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default HomePage;
