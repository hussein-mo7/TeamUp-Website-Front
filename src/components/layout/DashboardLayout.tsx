import DashboardHeader from "./DashboardHeader";
import AuthGuard from "./AuthGuard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <AuthGuard>
        <DashboardHeader />
        {/* pt-16 offsets the fixed header height */}
        <main className="scroll-smooth pt-16">
          <div className="mx-auto max-w-[1290px] px-3 py-8 pb-12 md:px-8 md:pb-10">
            {children}
          </div>
        </main>
      </AuthGuard>
    </div>
  );
};

export default DashboardLayout;
