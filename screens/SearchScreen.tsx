import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for search results
const allDestinations = [
  {
    id: '1',
    name: 'Santorini, Greece',
    image: 'https://api.a0.dev/assets/image?text=Beautiful%20Santorini%20Greece%20with%20white%20buildings%20and%20blue%20domes&aspect=16:9&seed=123',
    rating: 4.9,
    price: 299,
    type: 'Island',
  },
  {
    id: '2',
    name: 'Bali, Indonesia',
    image: 'https://api.a0.dev/assets/image?text=Tropical%20Bali%20beach%20with%20palm%20trees%20and%20clear%20water&aspect=16:9&seed=456',
    rating: 4.8,
    price: 199,
    type: 'Beach',
  },
  {
    id: '3',
    name: 'Kyoto, Japan',
    image: 'https://api.a0.dev/assets/image?text=Traditional%20Japanese%20temple%20in%20Kyoto%20with%20cherry%20blossoms&aspect=16:9&seed=789',
    rating: 4.7,
    price: 249,
    type: 'Cultural',
  },
  {
    id: '4',
    name: 'Paris, France',
    image: 'https://api.a0.dev/assets/image?text=Eiffel%20Tower%20Paris%20with%20city%20view&aspect=1:1&seed=101',
    rating: 4.6,
    price: 279,
    type: 'City',
  },
  {
    id: '5',
    name: 'New York, USA',
    image: 'https://api.a0.dev/assets/image?text=New%20York%20City%20skyline%20with%20Central%20Park&aspect=1:1&seed=102',
    rating: 4.5,
    price: 329,
    type: 'City',
  },
  {
    id: '6',
    name: 'Rome, Italy',
    image: 'https://api.a0.dev/assets/image?text=Colosseum%20in%20Rome%20Italy%20ancient%20architecture&aspect=1:1&seed=103',
    rating: 4.7,
    price: 259,
    type: 'Cultural',
  },
  {
    id: '7',
    name: 'Dubai, UAE',
    image: 'https://api.a0.dev/assets/image?text=Dubai%20skyline%20with%20Burj%20Khalifa%20and%20modern%20buildings&aspect=1:1&seed=104',
    rating: 4.8,
    price: 399,
    type: 'City',
  },
  {
    id: '8',
    name: 'Maldives',
    image: 'https://api.a0.dev/assets/image?text=Maldives%20overwater%20bungalows%20with%20crystal%20clear%20blue%20water&aspect=16:9&seed=105',
    rating: 4.9,
    price: 499,
    type: 'Island',
  },
  {
    id: '9',
    name: 'Barcelona, Spain',
    image: 'https://api.a0.dev/assets/image?text=Barcelona%20Sagrada%20Familia%20and%20colorful%20architecture&aspect=16:9&seed=106',
    rating: 4.7,
    price: 229,
    type: 'City',
  },
  {
    id: '10',
    name: 'Swiss Alps, Switzerland',
    image: 'https://api.a0.dev/assets/image?text=Swiss%20Alps%20mountains%20with%20snow%20and%20chalets&aspect=16:9&seed=107',
    rating: 4.8,
    price: 349,
    type: 'Mountain',
  },
];

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'city', label: 'City' },
  { id: 'beach', label: 'Beach' },
  { id: 'mountain', label: 'Mountain' },
  { id: 'island', label: 'Island' },
  { id: 'cultural', label: 'Cultural' },
];

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
];

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  // Filter and sort destinations
  const filteredDestinations = allDestinations
    .filter(item => {
      // Apply search query filter
      if (searchQuery) {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      // Apply category filter
      if (activeFilter === 'all') {
        return true;
      }
      return item.type.toLowerCase() === activeFilter.toLowerCase();
    })
    .sort((a, b) => {
      // Apply sorting
      switch (activeSort) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          // For popular, we'll use a combination of rating and price
          return (b.rating * 100 - b.price * 0.1) - (a.rating * 100 - a.price * 0.1);
      }
    });
  
  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.destinationItem}
      onPress={() => navigation.navigate('DestinationDetail', { destination: item })}
    >
      <Image source={{ uri: item.image }} style={styles.destinationImage} />
      <View style={styles.destinationContent}>
        <View style={styles.destinationHeader}>
          <Text style={styles.destinationName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.destinationDetails}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
          <Text style={styles.priceText}>${item.price}/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
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
          autoFocus
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {/* Filter Options */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        >
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterButton,
                activeFilter === option.id ? styles.activeFilterButton : null
              ]}
              onPress={() => setActiveFilter(option.id)}
            >
              <Text 
                style={[
                  styles.filterText,
                  activeFilter === option.id ? styles.activeFilterText : null
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Sort Button */}
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Ionicons name="options-outline" size={20} color="#3498db" />
        </TouchableOpacity>
      </View>
      
      {/* Sort Options Dropdown */}
      {showSortOptions ? (
        <View style={styles.sortOptionsContainer}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortOption,
                activeSort === option.id ? styles.activeSortOption : null
              ]}
              onPress={() => {
                setActiveSort(option.id);
                setShowSortOptions(false);
              }}
            >
              <Text 
                style={[
                  styles.sortOptionText,
                  activeSort === option.id ? styles.activeSortOptionText : null
                ]}
              >
                {option.label}
              </Text>
              {activeSort === option.id ? (
                <Ionicons name="checkmark" size={18} color="#3498db" />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      
      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsCount}>
          {filteredDestinations.length} {filteredDestinations.length === 1 ? 'result' : 'results'} found
        </Text>
        
        <FlatList
          data={filteredDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
        />
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
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
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
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtersList: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeFilterButton: {
    backgroundColor: '#3498db',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sortOptionsContainer: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  activeSortOption: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666',
    marginRight: 20,
  },
  activeSortOptionText: {
    color: '#3498db',
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  resultsList: {
    paddingBottom: 20,
  },
  destinationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  destinationImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  destinationContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  destinationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  typeContainer: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 12,
    color: '#3498db',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
  },
});