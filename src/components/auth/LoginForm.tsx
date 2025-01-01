import React from 'react';
import { supabase } from '../../lib/supabase';
import { Anchor, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="text-center">
        <Anchor className="h-12 w-12 mx-auto text-navy" />
        <h2 className="mt-4 font-serif text-3xl text-navy">Welcome Back</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seafoam focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-navy text-parchment py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <Loader className="h-5 w-5 mx-auto animate-spin" />
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-seafoam hover:underline">
          Join the crew
        </Link>
      </p>
    </form>
  );
}