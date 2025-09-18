import { StyleSheet, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Inputt from '../components/Inputt'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/features/authSlice'

const SignupPage = ({ navigation }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    mobile: '',
    mpin: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    age: '',
    address: ''
  })

  const handleChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.mobile || formData.mobile.length !== 8) {
      ToastAndroid.showWithGravity('Mobile number must be 8 digits', ToastAndroid.LONG, ToastAndroid.CENTER)
      return
    }
    if (!formData.mpin || formData.mpin.length !== 4) {
      ToastAndroid.showWithGravity('MPIN is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    if (!formData.firstName) {
      ToastAndroid.showWithGravity('First name is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    if (!formData.lastName) {
      ToastAndroid.showWithGravity('Last name is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    if (!formData.email || !formData.email.includes('@')) {
      ToastAndroid.showWithGravity('Email is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    if (!formData.age) {
      ToastAndroid.showWithGravity('Age is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }

  ToastAndroid.showWithGravity('SignUp successfully!', ToastAndroid.SHORT, ToastAndroid.CENTER)
    dispatch(registerUser(formData)) 
    setFormData({
      mobile: '',
      mpin: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      age: '',
      address: ''
    })
    navigation.navigate("LoginPage")
  }


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Inputt
          label="Mobile Number"
          value={formData.mobile}
          onChangeText={handleChange('mobile')}
          keyboardType="number-pad"
          maxLength={8}
          required
        />
        <Inputt
          label="MPIN"
          value={formData.mpin}
          onChangeText={handleChange('mpin')}
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
          required
        />
        <Inputt
          label="First Name"
          value={formData.firstName}
          onChangeText={handleChange('firstName')}
          required
        />
        <Inputt
          label="Middle Name"
          value={formData.middleName}
          onChangeText={handleChange('middleName')}
        />
        <Inputt
          label="Last Name"
          value={formData.lastName}
          onChangeText={handleChange('lastName')}
          required
        />
        <Inputt
          label="Email"
          value={formData.email}
          onChangeText={handleChange('email')}
          keyboardType="email-address"
          required
        />
        <Inputt
          label="Age"
          value={formData.age}
          onChangeText={handleChange('age')}
          keyboardType="number-pad"
          maxLength={2}
          required
        />
        <Inputt
          label="Address"
          value={formData.address}
          onChangeText={handleChange('address')}
          multiline
          numberOfLines={3}
        />

        <Button title="SignUp" onPress={handleSubmit} />
      </View>
    </ScrollView>
  )
}

export default SignupPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  formContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  }
})
