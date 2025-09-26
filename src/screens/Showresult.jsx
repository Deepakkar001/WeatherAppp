import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getWeather } from '../redux/features/GetWeatherdata'
import { useDispatch } from 'react-redux'
import { addWeatherSearch } from '../redux/features/weatherSlice'

const Showresult = ({ route }) => {
    const { city } = route.params
    const dispatch = useDispatch()
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await getWeather('current.json',city)
            setWeatherData(data)
            if (data) {
                // dispatch 
                dispatch(addWeatherSearch({
                    current: data.current,
                    location: data.location,
                    
                }))
            }
        }
        fetchWeather()
    }, [city, dispatch])

    if (!weatherData) {
        return (
            <View style={styles.container}>
                <Text>Loading weather...</Text>
            </View>
        )
    }

    const { current, location } = weatherData

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cityName}>{location.name}</Text>
                <Text style={styles.region}>{location.region}, {location.country}</Text>
            </View>

            <View style={styles.mainWeather}>
                <Text style={styles.temperature}>{current.temp_c}°C</Text>
                <Text style={styles.condition}>{current.condition.text}</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailItem}>🌡️ Feels like: {current.feelslike_c}°C</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailItem}>💧 Humidity: {current.humidity}%</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailItem}>💨 Wind: {current.wind_kph} km/h</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Showresult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    region: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    mainWeather: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#007bff',
    },
    condition: {
        fontSize: 18,
        color: '#666',
        marginTop: 10,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailRow: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailItem: {
        fontSize: 16,
        color: '#333',
    },
})
