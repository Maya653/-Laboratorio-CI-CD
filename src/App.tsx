import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { PassengerDashboard } from './components/PassengerDashboard';
import { DriverDashboard } from './components/DriverDashboard';
import { AdminDashboard } from './components/AdminDashboard';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'passenger' | 'driver' | 'admin';
  rating?: number;
  points?: number;
  verified?: boolean;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'passenger':
        return <PassengerDashboard user={currentUser} onLogout={handleLogout} />;
      case 'driver':
        return <DriverDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <div>Rol no válido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderDashboard()}
    </div>
  );
}