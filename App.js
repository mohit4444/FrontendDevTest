import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomeScreen from './src/HomeScreen';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://y5r3u5232fakxnc353rbtjdyvm.appsync-api.eu-west-1.amazonaws.com/graphql',
  headers: {'X-api-key':'da2-frbj2qpdvjh6bptdholrtw7kqi'},
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
    <View style={styles.container}>
      <HomeScreen/>
    </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20
  },
});
