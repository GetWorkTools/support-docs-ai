import React, { memo, useEffect, useCallback } from "react";
import { signIn, useSession } from "next-auth/react";
import { GoogleLogin } from "../../components/login/google-login";

const LoginViewComponent = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.location.href = "/home";
    }
  }, [session]);

  const handleClick = useCallback((e: any) => {
    e.preventDefault();
    signIn("google", { redirect: true, callbackUrl: "/home" });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome</h1>
      <p className="text-gray-600 mb-8">Login to start creating</p>
      <GoogleLogin handleClick={handleClick} />
    </div>
  );
};

export const LoginView = memo(LoginViewComponent);
