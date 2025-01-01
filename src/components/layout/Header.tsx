import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Compass, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { UserMenu } from './UserMenu';
import { useAuth } from '../../lib/contexts/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-navy text-parchment">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 animate-wave">
            <Anchor className="h-8 w-8" />
            <span className="font-serif text-2xl">Passage Planner</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            {user ? (
              <>
                <NavLink to="/journeys">My Journeys</NavLink>
                <NavLink to="/write">Write</NavLink>
                <UserMenu />
              </>
            ) : (
              <NavLink to="/login" className="flex items-center space-x-1">
                <Compass className="h-4 w-4" />
                <span>Login</span>
              </NavLink>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/explore">Explore</MobileNavLink>
            {user ? (
              <>
                <MobileNavLink to="/journeys">My Journeys</MobileNavLink>
                <MobileNavLink to="/write">Write</MobileNavLink>
                <UserMenu />
              </>
            ) : (
              <MobileNavLink to="/login">Login</MobileNavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "hover:text-seafoam transition-colors duration-200",
        className
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block py-2 hover:text-seafoam transition-colors duration-200"
    >
      {children}
    </Link>
  );
}