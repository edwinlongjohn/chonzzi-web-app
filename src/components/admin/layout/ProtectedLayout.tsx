import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminProtectedLayout() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated && !user) {
      setIsRedirecting(true);
      console.log('User is not authenticated. Redirecting to login page.');
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, isRedirecting, user]);


  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[color:var(--tint)]">
      <AdminSidebar />
      <main className="min-w-0 flex-1 px-5 pb-16 pt-20 sm:px-8 lg:pt-10">
        <Outlet />
      </main>
    </div>
  );
}