import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { performLogout } from '../redux/features/authActions'
import Button from '../components/Button'
import Card from '../components/Card'

const HomePage = ({ navigation }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)
  const weatherHistory = useSelector(state => state.weather.searchHistory)

  
  const handleLogout = async () => {
    const result = await dispatch(performLogout())
    if (result.success) {
      navigation.navigate('LoginPage')
    }
    navigation.reset({
      index:0,
      routes:[{name:'LoginPage'}],
    })
  }

  return (
    <View style={styles.container}>
      <Card variant="primary">
        <Text style={styles.welcomeText}>
          Welcome, {currentUser?.firstName} {currentUser?.lastName}!
        </Text>
        <Text style={styles.subText}>Good to see you back</Text>
      </Card>

      <Card variant="dark">
        <Text style={styles.sectionHeader}>Your Details:</Text>
        <Text style={styles.detailText}>📱 Mobile: {currentUser?.mobile}</Text>
        <Text style={styles.detailText}>📧 Email: {currentUser?.email}</Text>
        <Text style={styles.detailText}>🎂 Age: {currentUser?.age}</Text>
        <Text style={styles.detailText}>📍 Address: {currentUser?.address}</Text>
      </Card>

      {weatherHistory.length > 0 && (
        <Card>
          <Text style={styles.sectionTitle}>Recent Weather Searches:</Text>
          <FlatList
            data={weatherHistory.slice(0, 5)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyCity}>{item.location.name}</Text>
                <Text style={styles.historyTemp}>{item.current.temp_c}°C</Text>
                <Text style={styles.historyCondition}>{item.current.condition.text}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Card>
      )}

      <Button 
        title="🌤️ Check Weather" 
        variant="success" 
        onPress={() => navigation.navigate('Search')} 
      />
      <Button 
        title="🚪 Logout" 
        variant="danger" 
        onPress={handleLogout} 
      />
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#e3f2fd',
    marginTop: 5,
    textAlign:"center"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#171313ff',
    marginBottom: 15,
  },
  sectionHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#fdf9f9ff',
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyCity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  historyTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginHorizontal: 10,
  },
  historyCondition: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  }
})
