import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  Car, 
  MapPin, 
  Clock, 
  Star, 
  MessageCircle, 
  DollarSign,
  Users,
  Calendar,
  LogOut,
  Edit,
  Trash2
} from 'lucide-react';
import { Logo } from './Logo';
import type { User } from '../App';

interface DriverTrip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  passengers: Array<{
    id: string;
    name: string;
    rating: number;
  }>;
  status: 'active' | 'completed' | 'cancelled';
}

interface DriverDashboardProps {
  user: User;
  onLogout: () => void;
}

export function DriverDashboard({ user, onLogout }: DriverDashboardProps) {
  const [activeView, setActiveView] = useState('trips');
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    price: '',
    totalSeats: '4',
    description: ''
  });

  const mockTrips: DriverTrip[] = [
    {
      id: '1',
      origin: 'Centro de la Ciudad',
      destination: 'Zona Norte',
      date: '2024-10-08',
      time: '08:00',
      price: 25,
      availableSeats: 1,
      totalSeats: 4,
      passengers: [
        { id: '1', name: 'María López', rating: 4.8 },
        { id: '2', name: 'Juan Pérez', rating: 4.6 },
        { id: '3', name: 'Ana García', rating: 4.9 }
      ],
      status: 'active'
    },
    {
      id: '2',
      origin: 'Universidad',
      destination: 'Centro Comercial',
      date: '2024-10-07',
      time: '14:30',
      price: 18,
      availableSeats: 0,
      totalSeats: 3,
      passengers: [
        { id: '4', name: 'Carlos Ruiz', rating: 4.7 },
        { id: '5', name: 'Sofía Morales', rating: 4.8 },
        { id: '6', name: 'Pedro Castro', rating: 4.5 }
      ],
      status: 'completed'
    }
  ];

  const totalEarnings = mockTrips
    .filter(trip => trip.status === 'completed')
    .reduce((sum, trip) => sum + (trip.price * (trip.totalSeats - trip.availableSeats)), 0);

  const handleCreateTrip = () => {
    // Lógica para crear viaje
    console.log('Creating trip:', newTrip);
    setIsCreateTripOpen(false);
    setNewTrip({
      origin: '',
      destination: '',
      date: '',
      time: '',
      price: '',
      totalSeats: '4',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="md" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Car className="h-3 w-3 mr-1" />
                Conductor
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="font-medium">${totalEarnings}</span>
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
        <div className="flex justify-between items-center mb-6">
          <h2>Panel de Conductor</h2>
          <Dialog open={isCreateTripOpen} onOpenChange={setIsCreateTripOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Viaje
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Viaje</DialogTitle>
                <DialogDescription>
                  Publica un nuevo viaje para compartir con otros usuarios
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origen</Label>
                    <Input
                      id="origin"
                      placeholder="Ciudad de origen"
                      value={newTrip.origin}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, origin: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destino</Label>
                    <Input
                      id="destination"
                      placeholder="Ciudad de destino"
                      value={newTrip.destination}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, destination: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newTrip.date}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newTrip.time}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio por persona</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={newTrip.price}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seats">Asientos disponibles</Label>
                    <Input
                      id="seats"
                      type="number"
                      min="1"
                      max="8"
                      value={newTrip.totalSeats}
                      onChange={(e) => setNewTrip(prev => ({ ...prev, totalSeats: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Información adicional sobre el viaje..."
                    value={newTrip.description}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <Button onClick={handleCreateTrip} className="w-full">
                  Publicar Viaje
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trips">Mis Viajes</TabsTrigger>
            <TabsTrigger value="earnings">Ganancias</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="profile">Mi Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-6">
            <div className="grid gap-4">
              {mockTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium">{trip.origin} → {trip.destination}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {trip.date}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {trip.time}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  ${trip.price}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={trip.status === 'active' ? 'default' : 
                                     trip.status === 'completed' ? 'secondary' : 'destructive'}
                            >
                              {trip.status === 'active' ? 'Activo' : 
                               trip.status === 'completed' ? 'Completado' : 'Cancelado'}
                            </Badge>
                            {trip.status === 'active' && (
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Pasajeros confirmados:</span>
                            <Badge variant="outline">
                              {trip.passengers.length}/{trip.totalSeats}
                            </Badge>
                          </div>
                          
                          {trip.passengers.length > 0 && (
                            <div className="grid gap-2">
                              {trip.passengers.map((passenger) => (
                                <div key={passenger.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="text-xs">
                                        {passenger.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{passenger.name}</span>
                                    <div className="flex items-center space-x-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-xs">{passenger.rating}</span>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <MessageCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ganancias Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">${totalEarnings}</div>
                  <p className="text-sm text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Viajes Completados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {mockTrips.filter(trip => trip.status === 'completed').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Promedio por Viaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${Math.round(totalEarnings / mockTrips.filter(trip => trip.status === 'completed').length || 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Por viaje</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historial de Ganancias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrips.filter(trip => trip.status === 'completed').map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{trip.origin} → {trip.destination}</p>
                        <p className="text-sm text-muted-foreground">{trip.date} • {trip.passengers.length} pasajeros</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">
                          +${trip.price * trip.passengers.length}
                        </p>
                        <p className="text-sm text-muted-foreground">${trip.price} × {trip.passengers.length}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes</CardTitle>
                <CardDescription>
                  Conversaciones con pasajeros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tienes mensajes nuevos</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mi Perfil de Conductor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{user.rating}</span>
                        <span className="text-sm text-muted-foreground">• Conductor Verificado</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información del Vehículo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Marca:</span>
                    <span className="text-sm font-medium">Toyota Corolla</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Año:</span>
                    <span className="text-sm font-medium">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Color:</span>
                    <span className="text-sm font-medium">Blanco</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Placa:</span>
                    <span className="text-sm font-medium">ABC-123</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}