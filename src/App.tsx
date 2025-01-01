import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/home/HomePage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { LoginPage } from './pages/auth/LoginPage';
import { WritePage } from './pages/write/WritePage';
import { JourneysPage } from './pages/journeys/JourneysPage';
import { AuthProvider } from './lib/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-parchment">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/write" element={<WritePage />} />
              <Route path="/journeys" element={<JourneysPage />} />
              <Route path="/journeys/:id/edit" element={<WritePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}