import React, { memo, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { default as NextImage } from "next/image";
import { LogOut } from "lucide-react";
import { SimpleLogin } from "./simple-login";

export default memo(function Login() {
  const { data: session } = useSession();

  const handleClick = useCallback(() => {
    window.location.href = "/login";
  }, []);

  if (session) {
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 rounded-full bg-gray-200 flex overflow-hidden">
          {session?.user?.image && (
            <NextImage
              width={60}
              height={60}
              src={session.user.image}
              alt="user profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex justify-center items-center space-x-4 text-sm">
          <span>{session?.user?.name}</span>
          <button
            className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center space-x-2"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    );
  }

  return <SimpleLogin handleClick={handleClick} />;
});
