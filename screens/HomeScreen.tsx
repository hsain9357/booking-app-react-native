import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Mock data for destinations
const featuredDestinations = [
  {
    id: '1',
    name: 'Santorini, Greece',
    image: 'https://api.a0.dev/assets/image?text=Beautiful%20Santorini%20Greece%20with%20white%20buildings%20and%20blue%20domes&aspect=16:9&seed=123',
    rating: 4.9,
    price: 299,
  },
  {
    id: '2',
    name: 'Bali, Indonesia',
    image: 'https://api.a0.dev/assets/image?text=Tropical%20Bali%20beach%20with%20palm%20trees%20and%20clear%20water&aspect=16:9&seed=456',
    rating: 4.8,
    price: 199,
  },
  {
    id: '3',
    name: 'Kyoto, Japan',
    image: 'https://api.a0.dev/assets/image?text=Traditional%20Japanese%20temple%20in%20Kyoto%20with%20cherry%20blossoms&aspect=16:9&seed=789',
    rating: 4.7,
    price: 249,
  },
];

const popularDestinations = [
  {
    id: '4',
    name: 'Paris, France',
    image: 'https://api.a0.dev/assets/image?text=Eiffel%20Tower%20Paris%20with%20city%20view&aspect=1:1&seed=101',
    rating: 4.6,
    price: 279,
  },
  {
    id: '5',
    name: 'New York, USA',
    image: 'https://api.a0.dev/assets/image?text=New%20York%20City%20skyline%20with%20Central%20Park&aspect=1:1&seed=102',
    rating: 4.5,
    price: 329,
  },
  {
    id: '6',
    name: 'Rome, Italy',
    image: 'https://api.a0.dev/assets/image?text=Colosseum%20in%20Rome%20Italy%20ancient%20architecture&aspect=1:1&seed=103',
    rating: 4.7,
    price: 259,
  },
  {
    id: '7',
    name: 'Dubai, UAE',
    image: 'https://api.a0.dev/assets/image?text=Dubai%20skyline%20with%20Burj%20Khalifa%20and%20modern%20buildings&aspect=1:1&seed=104',
    rating: 4.8,
    price: 399,
  },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.featuredItem} 
      onPress={() => navigation.navigate('DestinationDetail', { destination: item })}
    >
      <ImageBackground 
        source={{ uri: item.image }} 
        style={styles.featuredImage}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.featuredGradient}>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredName}>{item.name}</Text>
            <View style={styles.featuredDetails}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <Text style={styles.priceText}>${item.price}/night</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderPopularItem = ({ item,idx }) => (
    <TouchableOpacity 
      style={styles.popularItem}
      onPress={() => navigation.navigate('DestinationDetail', { destination: item })}
      key={idx}
    >
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularContent}>
        <Text style={styles.popularName}>{item.name}</Text>
        <View style={styles.popularDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.popularRatingText}>{item.rating}</Text>
          </View>
          <Text style={styles.popularPriceText}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Traveler</Text>
            <Text style={styles.tagline}>Find your perfect getaway</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, hotels..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.categoryButton, styles.activeCategoryButton]}>
              <Ionicons name="home" size={20} color="#fff" />
              <Text style={styles.activeCategoryText}>Hotels</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="airplane" size={20} color="#3498db" />
              <Text style={styles.categoryText}>Flights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="car" size={20} color="#3498db" />
              <Text style={styles.categoryText}>Car Rental</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <MaterialIcons name="tour" size={20} color="#3498db" />
              <Text style={styles.categoryText}>Tours</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Featured Destinations */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredDestinations}
            renderItem={renderFeaturedItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Popular Destinations */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popularGrid}>
            {popularDestinations.map((item,idx) => renderPopularItem({ item ,idx}))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={24} color="#3498db" />
        <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <Ionicons name="search" size={24} color="#999" />
        <Text style={styles.navText}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('SavedDestinations')}
      >
        <Ionicons name="bookmark" size={24} color="#999" />
        <Text style={styles.navText}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate('BookingsScreen')}
      >
        <Ionicons name="calendar" size={24} color="#999" />
        <Text style={styles.navText}>Bookings</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  tagline: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  profileButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#3498db',
    height: 36,
    width: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginTop: 20,
    paddingLeft: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryButton: {
    backgroundColor: '#3498db',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  activeCategoryText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
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
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  featuredList: {
    paddingRight: 20,
  },
  featuredItem: {
    width: width * 0.75,
    height: 200,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredGradient: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  featuredContent: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 12,
    padding: 12,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  popularItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  popularImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  popularContent: {
    padding: 12,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  popularDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularRatingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  popularPriceText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3498db',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#999',
  },
  activeNavText: {
    color: '#3498db',
    fontWeight: '500',
  },
});
