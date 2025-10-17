import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Car, Users, Shield } from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'passenger' | 'driver' | 'admin'>('passenger');

  const handleLogin = () => {
    // Simulación de login
    const user: User = {
      id: '1',
      name: name || 'Usuario Demo',
      email: email || 'demo@example.com',
      role: selectedRole,
      rating: 4.5,
      points: 150,
      verified: true
    };
    onLogin(user);
  };

  const handleRegister = () => {
    // Simulación de registro
    const user: User = {
      id: '2',
      name: name,
      email: email,
      role: selectedRole,
      rating: 0,
      points: 0,
      verified: false
    };
    onLogin(user);
  };

  const roleCards = [
    {
      id: 'passenger',
      title: 'Pasajero',
      description: 'Busca y únete a viajes compartidos',
      icon: Users,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'driver',
      title: 'Conductor',
      description: 'Ofrece asientos en tus viajes',
      icon: Car,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'admin',
      title: 'Administrador',
      description: 'Gestiona la plataforma',
      icon: Shield,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-muted-foreground">Conectando viajeros</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Usuario</Label>
                  <div className="grid gap-3">
                    {roleCards.map((role) => {
                      const Icon = role.icon;
                      return (
                        <div
                          key={role.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedRole === role.id
                              ? 'border-primary bg-purple-50'
                              : 'bg-white border-purple-200 hover:bg-purple-25'
                          }`}
                          onClick={() => setSelectedRole(role.id as any)}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5" />
                            <div>
                              <p className="font-medium">{role.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {role.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Iniciar Sesión
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear Cuenta</CardTitle>
                <CardDescription>
                  Únete a nuestra comunidad de viajeros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Me quiero registrar como</Label>
                  <Select value={selectedRole} onValueChange={(value: any) => setSelectedRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passenger">Pasajero</SelectItem>
                      <SelectItem value="driver">Conductor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleRegister} className="w-full">
                  Crear Cuenta
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}