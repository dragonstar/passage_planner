import React from 'react';
import { JourneyList } from './JourneyList';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../../lib/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function JourneysPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-navy">My Journeys</h1>
        <button
          onClick={() => navigate('/write')}
          className="flex items-center space-x-2 px-4 py-2 bg-navy text-white rounded-md hover:bg-navy/90 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Journey</span>
        </button>
      </div>
      <JourneyList />
    </div>
  );
}