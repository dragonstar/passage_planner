import React from 'react';
import { AuthForm } from '../../components/auth/AuthForm';

export function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full">
        <AuthForm />
      </div>
    </div>
  );
}