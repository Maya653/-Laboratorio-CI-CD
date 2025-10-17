import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  MessageCircle, 
  Shield, 
  Award,
  Calendar,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface Trip {
  id: string;
  driver: string;
  driverRating: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  duration: string;
}

interface PassengerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function PassengerDashboard({ user, onLogout }: PassengerDashboardProps) {
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  const [activeView, setActiveView] = useState('search');

  const mockTrips: Trip[] = [
    {
      id: '1',
      driver: 'Carlos Mendez',
      driverRating: 4.8,
      origin: 'Centro de la Ciudad',
      destination: 'Zona Norte',
      date: '2024-10-08',
      time: '08:00',
      price: 25,
      availableSeats: 2,
      totalSeats: 4,
      duration: '45 min'
    },
    {
      id: '2',
      driver: 'Ana González',
      driverRating: 4.9,
      origin: 'Universidad',
      destination: 'Centro Comercial',
      date: '2024-10-08',
      time: '14:30',
      price: 18,
      availableSeats: 1,
      totalSeats: 3,
      duration: '30 min'
    },
    {
      id: '3',
      driver: 'Miguel Torres',
      driverRating: 4.6,
      origin: 'Aeropuerto',
      destination: 'Centro de la Ciudad',
      date: '2024-10-09',
      time: '10:15',
      price: 35,
      availableSeats: 3,
      totalSeats: 4,
      duration: '1h 15min'
    }
  ];

  const myTrips = [
    {
      id: '4',
      driver: 'Laura Ramos',
      origin: 'Mi Casa',
      destination: 'Trabajo',
      date: '2024-10-07',
      time: '07:30',
      status: 'Completado'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="md" />
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">Pasajero</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{user.points} pts</span>
              </div>
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Buscar Viajes</TabsTrigger>
            <TabsTrigger value="my-trips">Mis Viajes</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search Form */}
            <Card>
              <CardHeader>
                <CardTitle>Buscar Viajes</CardTitle>
                <CardDescription>
                  Encuentra el viaje perfecto para tu destino
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Origen</label>
                    <Input
                      placeholder="¿Desde dónde viajas?"
                      value={searchOrigin}
                      onChange={(e) => setSearchOrigin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destino</label>
                    <Input
                      placeholder="¿A dónde vas?"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Search className="h-4 w-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Trips */}
            <div className="space-y-4">
              <h3>Viajes Disponibles</h3>
              {mockTrips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar>
                            <AvatarFallback>{trip.driver.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{trip.driver}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{trip.driverRating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{trip.origin}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{trip.destination}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{trip.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">{trip.time} • {trip.duration}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">
                              {trip.availableSeats}/{trip.totalSeats} asientos
                            </Badge>
                            <span className="font-medium text-lg">${trip.price}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm">Unirse</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Viajes</CardTitle>
                <CardDescription>
                  Historial de tus viajes compartidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{trip.origin} → {trip.destination}</p>
                      <p className="text-sm text-muted-foreground">
                        Con {trip.driver} • {trip.date} {trip.time}
                      </p>
                    </div>
                    <Badge variant="outline">{trip.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes</CardTitle>
                <CardDescription>
                  Conversaciones con conductores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tienes mensajes aún</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mi Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {user.verified && (
                          <Badge variant="outline" className="text-green-600">
                            <Shield className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{user.points}</div>
                      <div className="text-sm text-muted-foreground">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold flex items-center justify-center">
                        {user.rating}
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      </div>
                      <div className="text-sm text-muted-foreground">Calificación</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Botón de Pánico
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    En caso de emergencia, presiona este botón para alertar a las autoridades
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}