import React from 'react';
import { LoginForm } from '../../components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}