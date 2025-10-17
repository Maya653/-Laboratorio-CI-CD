import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Users, 
  Car, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Star, 
  TrendingUp,
  Search,
  Shield,
  LogOut,
  Ban,
  Eye,
  Award,
  Settings
} from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'passenger' | 'driver';
  status: 'active' | 'suspended' | 'pending';
  verified: boolean;
  rating: number;
  joinDate: string;
  totalTrips: number;
}

interface Report {
  id: string;
  reporterName: string;
  reportedUserName: string;
  type: 'harassment' | 'safety' | 'fraud' | 'other';
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
  severity: 'low' | 'medium' | 'high';
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Carlos Mendez',
      email: 'carlos@email.com',
      role: 'driver',
      status: 'active',
      verified: true,
      rating: 4.8,
      joinDate: '2024-01-15',
      totalTrips: 45
    },
    {
      id: '2',
      name: 'María López',
      email: 'maria@email.com',
      role: 'passenger',
      status: 'active',
      verified: true,
      rating: 4.9,
      joinDate: '2024-03-20',
      totalTrips: 23
    },
    {
      id: '3',
      name: 'Juan Pérez',
      email: 'juan@email.com',
      role: 'driver',
      status: 'pending',
      verified: false,
      rating: 0,
      joinDate: '2024-10-05',
      totalTrips: 0
    }
  ];

  const mockReports: Report[] = [
    {
      id: '1',
      reporterName: 'Ana García',
      reportedUserName: 'Pedro Ruiz',
      type: 'harassment',
      description: 'Comportamiento inapropiado durante el viaje',
      status: 'pending',
      date: '2024-10-07',
      severity: 'high'
    },
    {
      id: '2',
      reporterName: 'Luis Torres',
      reportedUserName: 'Sofia Morales',
      type: 'safety',
      description: 'Conducción peligrosa',
      status: 'pending',
      date: '2024-10-06',
      severity: 'medium'
    }
  ];

  const stats = {
    totalUsers: 1245,
    activeTrips: 89,
    pendingVerifications: 15,
    openReports: 8,
    monthlyGrowth: 12.5
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="md" />
              <span className="text-sm text-muted-foreground">Admin</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Shield className="h-3 w-3 mr-1" />
                Administrador
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Panel General</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Usuarios</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600">+{stats.monthlyGrowth}%</span>
                    <span className="text-muted-foreground ml-1">este mes</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Viajes Activos</p>
                      <p className="text-2xl font-bold">{stats.activeTrips}</p>
                    </div>
                    <Car className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Verificaciones Pendientes</p>
                      <p className="text-2xl font-bold">{stats.pendingVerifications}</p>
                    </div>
                    <Shield className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reportes Abiertos</p>
                      <p className="text-2xl font-bold">{stats.openReports}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas Recientes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      8 reportes nuevos requieren revisión inmediata
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      15 usuarios pendientes de verificación
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividad del Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Usuarios activos hoy</span>
                      <span className="font-medium">234</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Viajes completados hoy</span>
                      <span className="font-medium">67</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>
                  Administra usuarios, verificaciones y suspensiones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuarios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-72"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{user.name}</p>
                            {user.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>
                              {user.role === 'driver' ? 'Conductor' : 'Pasajero'}
                            </span>
                            <span className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                              {user.rating || 'N/A'}
                            </span>
                            <span>{user.totalTrips} viajes</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            user.status === 'active' ? 'default' : 
                            user.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {user.status === 'active' ? 'Activo' : 
                           user.status === 'pending' ? 'Pendiente' : 'Suspendido'}
                        </Badge>
                        
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {user.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {user.status === 'active' && (
                            <Button variant="outline" size="sm" className="text-red-600">
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Reportes</CardTitle>
                <CardDescription>
                  Revisa y resuelve reportes de incidentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge 
                              variant={
                                report.severity === 'high' ? 'destructive' :
                                report.severity === 'medium' ? 'default' : 'secondary'
                              }
                            >
                              {report.severity === 'high' ? 'Alta' :
                               report.severity === 'medium' ? 'Media' : 'Baja'}
                            </Badge>
                            <Badge variant="outline">
                              {report.type === 'harassment' ? 'Acoso' :
                               report.type === 'safety' ? 'Seguridad' :
                               report.type === 'fraud' ? 'Fraude' : 'Otro'}
                            </Badge>
                          </div>
                          <p className="font-medium mb-1">
                            {report.reporterName} reportó a {report.reportedUserName}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            {report.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Reportado el {report.date}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-600">
                            Resolver
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Descartar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sistema de Recompensas</CardTitle>
                <CardDescription>
                  Gestiona puntos, insignias y recompensas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3>Configuración de Puntos</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Completar viaje (pasajero):</span>
                        <span className="text-sm font-medium">10 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Completar viaje (conductor):</span>
                        <span className="text-sm font-medium">15 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Verificar identidad:</span>
                        <span className="text-sm font-medium">50 pts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Calificación 5 estrellas:</span>
                        <span className="text-sm font-medium">5 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3>Insignias Disponibles</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 p-2 border rounded">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs">Conductor Estrella</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span className="text-xs">Pasajero Frecuente</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded">
                        <Award className="h-4 w-4 text-green-500" />
                        <span className="text-xs">Eco Friendly</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border rounded">
                        <Award className="h-4 w-4 text-purple-500" />
                        <span className="text-xs">Puntual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>
                  Ajustes generales de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3>Configuración de Viajes</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tiempo máximo de cancelación (horas):</label>
                        <Input type="number" defaultValue="2" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Radio de búsqueda (km):</label>
                        <Input type="number" defaultValue="50" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3>Configuración de Seguridad</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Calificación mínima para conducir:</label>
                        <Input type="number" step="0.1" defaultValue="4.0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Máximo reportes antes de suspensión:</label>
                        <Input type="number" defaultValue="3" />
                      </div>
                    </div>
                  </div>

                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Guardar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}