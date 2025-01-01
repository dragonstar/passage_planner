import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../lib/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <span className="text-parchment">{user.email}</span>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 text-parchment hover:text-seafoam transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}