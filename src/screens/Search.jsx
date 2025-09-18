import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import Inputt from '../components/Inputt'
import { searchLocation } from '../redux/features/GetWeatherdata'
const Search = () => {
    const navigation = useNavigation()
    //Managing the input state 
    const [formData, setFormData] = useState({
        city: '',
    })
    //Managing  the search result coming from searchLocation func 
    const [searchResults, setSearchResults] = useState([])
    //Storing the serach location for weatherSearc

    //Updating the input change and calling the function if input >3 words
    const handleChange = (field) => async (value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (value.length >= 3) {
            const results = await searchLocation(value) //Getting Value from async function
            setSearchResults(results) //Updating the state
        } else {
            setSearchResults([])
        }
    }
    //Storing the userSelected city
    const selectCity = (city) => {
        setFormData({ city: city.name })
        setSearchResults([])
        
    }

    //Handling the Submit and Passsing the data to the ShowResult Component
    const handleSubmit = () => {
        if (formData.city) {
            navigation.navigate("Showresult", { city:formData.city });
        }
    }
    return (
        <View style={styles.formContainer}>
            <Inputt
                label="the city You want to search"
                value={formData.city}
                onChangeText={handleChange('city')}
                required
            />
            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.cityItem} 
                            onPress={() => selectCity(item)}
                        >
                            <Text style={styles.cityName}>{item.name}</Text>
                            <Text style={styles.cityRegion}>{item.region}, {item.country}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.resultsList}
                />
            )}
             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.submitButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Search


const styles = StyleSheet.create({
    formContainer: {
        paddingTop: 20,
        paddingBottom: 40,
    },
    resultsList: {
        maxHeight: 200,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 5,
    },
    cityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cityName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cityRegion: {
        fontSize: 14,
        color: '#666',
    },
     submitButton: {
    backgroundColor: "#007bff",
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  }
})