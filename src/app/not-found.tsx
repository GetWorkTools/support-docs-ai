import Header from '@/client/components/header';
import Link from 'next/link';
import React from 'react'

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4 mt-[20dvh] sm:mt-[18dvh]">
        <div className="mx-auto max-w-md text-center">
          <div className="text-[6rem] font-bold text-primary">404</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, page not found!</h1>
          <p className="mt-4 text-muted-foreground text-balance max-w-80">The page you are looking for does not exist or has been moved.</p>
          <div className="flex mt-6">
            <Link
              href="/home"
              className="mx-auto bg-white py-2 px-4 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 hover:underline "
              prefetch={false}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}