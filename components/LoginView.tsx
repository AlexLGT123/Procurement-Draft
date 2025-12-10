
import React from 'react';
import { RocketIcon } from './Icon';
import { useAuth } from '../context/AuthContext';

export const LoginView: React.FC = () => {
  const { signInWithGoogle, error } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0D0D] p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] border border-[#262626] rounded-xl p-8 shadow-2xl flex flex-col items-center text-center">
        <div className="mb-6 bg-[#7F56D9]/10 p-4 rounded-full border border-[#7F56D9]/20">
          <RocketIcon className="h-12 w-12 text-[#7F56D9]" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">
          ProcurementDraft <span className="text-[#7F56D9]">IA</span>
        </h1>
        <p className="text-[#A3A3A3] mb-8">
          Sign in to access your intelligent procurement drafting assistant. Your drafts will be synced to the cloud.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm w-full text-left break-words">
            <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
            </div>

            {(error.includes("Domain") || error.includes("authorized")) && (
                <div className="mt-4 pt-4 border-t border-red-500/30 text-xs font-mono bg-black/20 p-2 rounded">
                    <p className="mb-2 font-bold text-white">1. Copy this domain:</p>
                    <p className="select-all bg-white/10 p-2 rounded mb-4 text-white break-all">
                        {window.location.hostname}
                    </p>
                    <p className="mb-2 font-bold text-white">2. Go to Firebase Console &gt; Authentication &gt; Settings &gt; Authorized Domains</p>
                    <p className="mb-4">3. Click "Add Domain" and paste the value above.</p>
                    
                    <details>
                        <summary className="cursor-pointer opacity-70 hover:opacity-100 text-[10px] uppercase tracking-wider">Show Full Debug Info</summary>
                        <div className="mt-2 space-y-1 opacity-70 break-all">
                            <p><span className="text-red-300">Hostname:</span> {window.location.hostname}</p>
                            <p><span className="text-red-300">Origin:</span> {window.location.origin}</p>
                            <p><span className="text-red-300">Href:</span> {window.location.href}</p>
                        </div>
                    </details>
                </div>
            )}
          </div>
        )}

        <button
          onClick={signInWithGoogle}
          className="w-full bg-[#F5F5F5] hover:bg-white text-[#0D0D0D] font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
