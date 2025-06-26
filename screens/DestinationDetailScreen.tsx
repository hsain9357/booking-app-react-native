import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { useAppContext, Destination, Review } from '../context/AppContext'; // Import Destination and Review types

const { width } = Dimensions.get('window');

interface RouteParams {
  destination: Destination;
}

const amenities = [
  { id: 1, name: 'Free WiFi', icon: 'wifi' },
  { id: 2, name: 'Swimming Pool', icon: 'water' },
  { id: 3, name: 'Breakfast', icon: 'restaurant' },
  { id: 4, name: 'Parking', icon: 'car' },
  { id: 5, name: 'Air Conditioning', icon: 'snow' },
  { id: 6, name: 'Gym', icon: 'barbell' },
];

const reviews = [
  {
    id: '1',
    user: 'Sarah Johnson',
    avatar: 'https://api.a0.dev/assets/image?text=Sarah%20Johnson%20profile%20photo%20woman%20smiling&aspect=1:1&seed=201',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Absolutely stunning location! The views were breathtaking and the staff was incredibly helpful. Would definitely recommend to anyone looking for a luxury getaway.',
  },
  {
    id: '2',
    user: 'Michael Chen',
    avatar: 'https://api.a0.dev/assets/image?text=Michael%20Chen%20profile%20photo%20man%20professional&aspect=1:1&seed=202',
    rating: 4,
    date: '1 month ago',
    comment: 'Great experience overall. The room was spacious and clean. Only giving 4 stars because the restaurant was a bit pricey, but the food was excellent.',
  },
];

export default function DestinationDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>(); // Use 'any' for now, will define proper types later
  const { destination } = route.params as RouteParams || {
    id: '1',
    name: 'Santorini, Greece',
    image: 'https://api.a0.dev/assets/image?text=Beautiful%20Santorini%20Greece%20with%20white%20buildings%20and%20blue%20domes&aspect=16:9&seed=123',
    rating: 4.9,
    price: 299,
  };

  const { data, toggleFavoriteDestination, getDestinationById } = useAppContext();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [favorited, setFavorited] = useState<boolean>(destination?.favorited || false);

  // Update favorited state when destination data changes (e.g., from context)
  useFocusEffect(
    useCallback(() => {
      const currentDestination = getDestinationById(destination.id);
      if (currentDestination) {
        setFavorited(currentDestination.favorited || false);
      }
    }, [data, destination.id, getDestinationById])
  );

  const handleBookNow = () => {
    toast.success('Booking successful!', {
      description: `You've booked ${destination.name} for ${guests} guests.`,
      duration: 4000,
    });
  };

  const handleFavoriteToggle = () => {
    toggleFavoriteDestination(destination.id);
    setFavorited((prev: boolean) => !prev); // Explicitly type prev
    toast.success(favorited ? 'Removed from favorites' : 'Added to favorites', {
      description: `${destination.name} has been ${favorited ? 'removed from' : 'added to'} your saved destinations.`,
      duration: 2000,
    });
  };

  const renderDateOption = (day: string, date: string) => {
    const isSelected = selectedDate === date;
    return (
      <TouchableOpacity
        key={date}
        style={[styles.dateOption, isSelected ? styles.selectedDate : null]}
        onPress={() => setSelectedDate(date)}
      >
        <Text style={[styles.dateDay, isSelected ? styles.selectedDateText : null]}>{day}</Text>
        <Text style={[styles.dateNumber, isSelected ? styles.selectedDateText : null]}>{date}</Text>
      </TouchableOpacity>
    );
  };

  const renderAmenity = (item: { id: number; name: string; icon: string }) => (
    <View key={item.id} style={styles.amenityItem}>
      <View style={styles.amenityIconContainer}>
        <Ionicons name={item.icon as any} size={18} color="#3498db" /> {/* Cast to any for Ionicons name */}
      </View>
      <Text style={styles.amenityText}>{item.name}</Text>
    </View>
  );

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewUser}>
          <Text style={styles.reviewUserName}>{review.user}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
        <View style={styles.reviewRating}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name="star"
              size={14}
              color={i < review.rating ? "#FFD700" : "#e0e0e0"}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: destination.image }}
            style={styles.headerImage}
          >
            <View style={styles.headerOverlay}>
              <View style={styles.headerButtons}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={handleFavoriteToggle}
                >
                  <Ionicons
                    name={favorited ? "heart" : "heart-outline"}
                    size={22}
                    color={favorited ? "#ff4757" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.imageIndicators}>
            {[...Array(3)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  i === 0 ? styles.activeIndicator : null
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View>
              <Text style={styles.title}>{destination.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={16} color="#3498db" />
                <Text style={styles.locationText}>
                  {destination.name.split(',')[1]?.trim() || 'Greece'}
                </Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingText}>{destination.rating}</Text>
              <Text style={styles.reviewsCount}>(128 reviews)</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Experience the breathtaking beauty of {destination.name} with our luxury accommodations.
            Enjoy stunning views, world-class amenities, and unforgettable experiences in one of the
            world's most sought-after destinations.
          </Text>

          {/* Amenities */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenities.map(renderAmenity)}
            </View>
          </View>

          {/* Availability */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesContainer}
            >
              {renderDateOption('Mon', '10')}
              {renderDateOption('Tue', '11')}
              {renderDateOption('Wed', '12')}
              {renderDateOption('Thu', '13')}
              {renderDateOption('Fri', '14')}
              {renderDateOption('Sat', '15')}
              {renderDateOption('Sun', '16')}
            </ScrollView>
          </View>

          {/* Guest Selection */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Guests</Text>
            <View style={styles.guestSelector}>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => guests > 1 ? setGuests(guests - 1) : null}
              >
                <Ionicons name="remove" size={20} color="#3498db" />
              </TouchableOpacity>
              <Text style={styles.guestCount}>{guests}</Text>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => guests < 10 ? setGuests(guests + 1) : null}
              >
                <Ionicons name="add" size={20} color="#3498db" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewsContainer}>
              {reviews.map(renderReview)}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Booking Bar */}
      <View style={styles.bookingBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${destination.price}</Text>
          <Text style={styles.priceSubtext}>/night</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookNow}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 15,
  },
  amenityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
  },
  datesContainer: {
    paddingBottom: 10,
  },
  dateOption: {
    width: 60,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDate: {
    backgroundColor: '#3498db',
  },
  dateDay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
  guestSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  guestButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
  },
  reviewsContainer: {
    marginTop: 5,
  },
  reviewItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewUser: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bookingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    marginBottom: 2,
  },
  bookButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
