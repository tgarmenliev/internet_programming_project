import { useState } from 'react';
import { useRouter } from 'next/router';
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import DashboardPage from './dashboard';

export default function WelcomePage () {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-start ml-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Present Manager website!</h1>
      <div className="flex items-center">
        <SignedIn>
          <div>
            <UserButton />
            <SignOutButton className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700 ml-4 mr-4" />
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-500 disabled:opacity-50 mt-4"
              onClick={handleGoToDashboard}
            >
              Go to dashboard
            </button>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700 ml-auto" />
        </SignedOut>
      </div>
    </div>
  );
};