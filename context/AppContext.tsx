import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the types for our data
export interface Destination {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  type: string;
  description: string;
  activities: string[];
  amenities: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  gallery: string[];
  reviews: Review[];
  favorited?: boolean;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Booking {
  id: string;
  userId: string;
  destinationId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

interface AppData {
  destinations: Destination[];
  users: User[];
  bookings: Booking[];
}

interface AppContextType {
  data: AppData | null;
  loading: boolean;
  error: string | null;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  cancelBooking: (bookingId: string) => void;
  getUserBookings: (userId: string) => Booking[];
  getDestinationById: (id: string) => Destination | undefined;
  toggleFavoriteDestination: (destinationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // For our demo, we'll import the JSON directly
        const response = await import('../data/database.json');
        setData(response.default);
        
        // Set a default current user for demo purposes
        if (response.default.users && response.default.users.length > 0) {
          setCurrentUser(response.default.users[0]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, []);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    if (!data) return;
    
    const newBooking: Booking = {
      ...booking,
      id: `b${data.bookings.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setData({
      ...data,
      bookings: [...data.bookings, newBooking]
    });
  };

  const cancelBooking = (bookingId: string) => {
    if (!data) return;
    
    const updatedBookings = data.bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    
    setData({
      ...data,
      bookings: updatedBookings
    });
  };

  const getUserBookings = (userId: string) => {
    if (!data) return [];
    return data.bookings.filter(booking => booking.userId === userId);
  };

  const getDestinationById = (id: string) => {
    if (!data) return undefined;
    return data.destinations.find(destination => destination.id === id);
  };

  const toggleFavoriteDestination = (destinationId: string) => {
    if (!data) return;

    const updatedDestinations = data.destinations.map(dest =>
      dest.id === destinationId
        ? { ...dest, favorited: !dest.favorited }
        : dest
    );

    setData({
      ...data,
      destinations: updatedDestinations
    });
  };

  return (
    <AppContext.Provider value={{
      data,
      loading,
      error,
      currentUser,
      setCurrentUser,
      addBooking,
      cancelBooking,
      getUserBookings,
      getDestinationById,
      toggleFavoriteDestination
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
