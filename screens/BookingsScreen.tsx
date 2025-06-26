import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Mock data for bookings
const bookingsData = [
  {
    id: 'b1',
    destination: {
      id: '1',
      name: 'Santorini, Greece',
      image: 'https://api.a0.dev/assets/image?text=Beautiful%20Santorini%20Greece%20with%20white%20buildings%20and%20blue%20domes&aspect=16:9&seed=123',
      rating: 4.9,
    },
    checkIn: '2025-07-15',
    checkOut: '2025-07-20',
    guests: 2,
    totalPrice: 1495,
    status: 'upcoming',
  },
  {
    id: 'b2',
    destination: {
      id: '2',
      name: 'Bali, Indonesia',
      image: 'https://api.a0.dev/assets/image?text=Tropical%20Bali%20beach%20with%20palm%20trees%20and%20clear%20water&aspect=16:9&seed=456',
      rating: 4.8,
    },
    checkIn: '2025-08-10',
    checkOut: '2025-08-17',
    guests: 3,
    totalPrice: 1393,
    status: 'upcoming',
  },
  {
    id: 'b3',
    destination: {
      id: '4',
      name: 'Paris, France',
      image: 'https://api.a0.dev/assets/image?text=Eiffel%20Tower%20Paris%20with%20city%20view&aspect=1:1&seed=101',
      rating: 4.6,
    },
    checkIn: '2025-05-05',
    checkOut: '2025-05-10',
    guests: 2,
    totalPrice: 1395,
    status: 'completed',
  },
  {
    id: 'b4',
    destination: {
      id: '7',
      name: 'Dubai, UAE',
      image: 'https://api.a0.dev/assets/image?text=Dubai%20skyline%20with%20Burj%20Khalifa%20and%20modern%20buildings&aspect=1:1&seed=104',
      rating: 4.8,
    },
    checkIn: '2025-03-15',
    checkOut: '2025-03-20',
    guests: 4,
    totalPrice: 1995,
    status: 'completed',
  },
  {
    id: 'b5',
    destination: {
      id: '10',
      name: 'Swiss Alps, Switzerland',
      image: 'https://api.a0.dev/assets/image?text=Swiss%20Alps%20mountains%20with%20snow%20and%20chalets&aspect=16:9&seed=107',
      rating: 4.8,
    },
    checkIn: '2025-12-20',
    checkOut: '2025-12-27',
    guests: 2,
    totalPrice: 2443,
    status: 'upcoming',
  },
];

const { width } = Dimensions.get('window');

export default function BookingsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const filteredBookings = bookingsData.filter(booking => booking.status === activeTab);
  
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleCancelBooking = (bookingId) => {
    toast.error('Booking Cancelled', {
      description: 'Your booking has been cancelled successfully.',
      duration: 4000,
    });
  };
  
  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <Image source={{ uri: item.destination.image }} style={styles.bookingImage} />
      
      <View style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.destinationName}>{item.destination.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.destination.rating}</Text>
          </View>
        </View>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {formatDate(item.checkIn)} - {formatDate(item.checkOut)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              {item.guests} {item.guests === 1 ? 'Guest' : 'Guests'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              ${item.totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.bookingActions}>
          {activeTab === 'upcoming' ? (
            <>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => navigation.navigate('DestinationDetail', { destination: item.destination })}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => handleCancelBooking(item.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => navigation.navigate('DestinationDetail', { destination: item.destination })}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.bookAgainButton}
                onPress={() => navigation.navigate('DestinationDetail', { destination: item.destination })}
              >
                <Text style={styles.bookAgainButtonText}>Book Again</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name={activeTab === 'upcoming' ? 'calendar-outline' : 'time-outline'} size={60} color="#ccc" />
      <Text style={styles.emptyTitle}>No {activeTab === 'upcoming' ? 'upcoming' : 'past'} bookings</Text>
      <Text style={styles.emptyText}>
        {activeTab === 'upcoming' 
          ? "You don't have any upcoming trips. Start exploring destinations to book your next adventure!"
          : "You haven't completed any trips yet. Your past bookings will appear here."}
      </Text>
      {activeTab === 'upcoming' ? (
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.exploreButtonText}>Explore Destinations</Text>
        </TouchableOpacity>
      ):''}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' ? styles.activeTab :null]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' ? styles.activeTabText : null]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' ? styles.activeTab : null]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' ? styles.activeTabText : null]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  bookingsList: {
    padding: 20,
    paddingBottom: 40,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bookingImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  bookingContent: {
    padding: 15,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  bookingDetails: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    marginRight: 8,
  },
  viewButtonText: {
    color: '#3498db',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontWeight: '500',
  },
  bookAgainButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    marginLeft: 8,
  },
  bookAgainButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#3498db',
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});