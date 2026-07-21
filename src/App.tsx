import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layouts
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Pages
import HomePage from '@/pages/HomePage';
import AcademyPage from '@/pages/AcademyPage';
import CoachingPage from '@/pages/CoachingPage';
import StoriesPage from '@/pages/StoryPage';
import ToolsPage from '@/pages/ToolsPage';
import PersonalityPage from '@/pages/PersonalityPage';
import HealthCheckPage from '@/pages/HealthCheckPage';
import RiskProfilePage from '@/pages/RiskProfilePage';

// 1. The Layout Wrapper with Animations
function RootLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-cream text-ink font-serif text-[17px] leading-relaxed flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex-1"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

// 2. The Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "academy", element: <AcademyPage /> },
      { path: "coaching", element: <CoachingPage /> },
      { path: "stories", element: <StoriesPage /> },
      { path: "tools", element: <ToolsPage /> },
      { path: "tools/personality", element: <PersonalityPage /> },
      { path: "tools/health-check", element: <HealthCheckPage /> },
      { path: "tools/risk-profile", element: <RiskProfilePage /> },
    ],
  },
]);

// 3. The default export required for main.tsx
export default function App() {
  return <RouterProvider router={router} />;
}