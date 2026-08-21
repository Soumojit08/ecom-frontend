import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Sign in to access this page");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
