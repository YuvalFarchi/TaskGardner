import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Task Gardner</Text>
      <Text style={styles.subtitle}>Grow your productivity</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8B3E3E',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
}); 