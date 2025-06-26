
  import { NavigationContainer } from '@react-navigation/native';
  import DestinationDetailScreen from "./screens/DestinationDetailScreen"
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { StyleSheet, View ,Text} from 'react-native';
  import { SafeAreaProvider } from "react-native-safe-area-context"
  import { Toaster } from 'sonner-native';
  import HomeScreen from "./screens/HomeScreen"
  import BookingsScreen from "./screens/BookingsScreen"
  import SearchScreen from "./screens/SearchScreen"
  import SavedDestinationsScreen from "./screens/SavedDestinationsScreen" // Import the new screen
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
  import { AppProvider } from './context/AppContext'; // Import AppProvider
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(false); // Shows full logs

  const Stack = createNativeStackNavigator();
  function RootStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
       <Stack.Screen name="SavedDestinations" component={SavedDestinationsScreen} />
      </Stack.Navigator>
    );
  }
  
  export default function App() {
    return (
          <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Toaster />
          <AppProvider>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </AppProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      userSelect: "none"
    }
  });
