import React from 'react';
import { BlogPostForm } from './components/BlogPostForm';
import { useAuth } from '../../lib/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function WritePage() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  const isEditing = location.pathname.includes('/edit');
  const title = isEditing ? 'Edit Journey Log' : 'Create New Journey Log';

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl text-navy mb-8">{title}</h1>
      <BlogPostForm />
    </div>
  );
}