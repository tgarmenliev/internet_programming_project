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
    <div>
      <h1 className="text-2xl font-bold">Birthday website</h1>
      <SignedIn>
        <UserButton />
        Welcome! <SignOutButton />
      </SignedIn>
      <SignedOut>
        Please sign in: <SignInButton className="bg-slate-500" />
      </SignedOut>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        onClick={handleGoToDashboard}
      >
        Go to dashboard
      </button>
    </div>
  );
};