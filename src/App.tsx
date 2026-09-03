import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { Toaster } from "sonner";
// Layouts
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';


// Pages
import HomePage from '@/pages/HomePage';
import AcademyPage from '@/pages/AcademyPage';
import CoachingPage from '@/pages/CoachingPage';
import StoriesPage from '@/pages/StoryPage';
import AssessmentsHub from '@/pages/ToolsPage';
import PersonalityPage from '@/pages/PersonalityPage';
import HealthCheckPage from '@/pages/HealthCheckPage';
import RiskProfilePage from '@/pages/RiskProfilePage';
import { renderErrorPage } from '@/pages/ErrorPage';
import AuthLayout from '@/components/layout/auth/AuthLayout';
import AdminProtectedLayout from '@/components/admin/layout/ProtectedLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboard';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { WaitlistPage } from '@/pages/admin/Waitlist';
import NewsletterPage from '@/pages/admin/NewsLetter';
import AssessmentsPage from '@/pages/admin/Assessments';
import BlogPage from '@/pages/admin/blog/Index';
import SettingsPage from '@/pages/admin/Settings';
import { NewPostPage } from '@/pages/admin/blog/Create';
import ViewPostPage from './pages/admin/blog/Post';
import { EditPostPage } from './pages/admin/blog/Edit';
import CollectionPage from './pages/public-blog/Collection';
import StoryDetailPage from './pages/public-blog/StoryDetailsPage';

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
    errorElement: <div dangerouslySetInnerHTML={{ __html: renderErrorPage() }} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "academy", element: <AcademyPage /> },
      { path: "coaching", element: <CoachingPage /> },
      { path: "stories", element: <StoriesPage /> },
      {path: "stories/:collection", element: <CollectionPage />},
      {path: "stories/:collection/:slug", element: <StoryDetailPage />},
      { path: "assessments", element: <AssessmentsHub /> },
      { path: "assessments/personality", element: <PersonalityPage /> },
      { path: "assessments/health-check", element: <HealthCheckPage /> },
      { path: "assessments/risk-profile", element: <RiskProfilePage /> },
    ],

  },
  {
    path: "authentication",
    element: <AuthLayout />,
    errorElement: <div dangerouslySetInnerHTML={{ __html: renderErrorPage() }} />,
    children: [
      { path: "login", Component: LoginPage },
    ]
  },
  {
    path: "chonzzi-admin",
    Component: AdminProtectedLayout,
    errorElement: <div dangerouslySetInnerHTML={{ __html: renderErrorPage() }} />,
    children: [
      { index: true, Component: AdminDashboardPage },
      { path: "waitlist", Component: WaitlistPage },
      { path: "newsletter", Component: NewsletterPage },
      { path: "assessments", Component: AssessmentsPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/new", Component: NewPostPage },
      {path: "blog/:postId", Component: ViewPostPage},
      {path: "blog/:postId/edit", Component: EditPostPage},
      { path: "settings", Component: SettingsPage },

    ]
  }
]);

// 3. The default export required for main.tsx
export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <Toaster />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
