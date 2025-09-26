import { StyleSheet,View, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { validateLogin } from '../redux/features/authActions'
import Inputt from '../components/Inputt'
import Button from '../components/Button'

const LoginPage = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    mobile: '',
    mpin: ''
  })

  const handleChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async() => {
    if (!formData.mobile || formData.mobile.length !== 8) {
      ToastAndroid.showWithGravity('Mobile number must be 8 digits', ToastAndroid.LONG, ToastAndroid.CENTER)
      return
    }
    if (!formData.mpin || formData.mpin.length !== 4) {
      ToastAndroid.showWithGravity('MPIN is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
     //Waiting for validation by redux
    const result = await dispatch(validateLogin(formData.mobile, formData.mpin))

    if (result.success) {
      ToastAndroid.showWithGravity(result.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
      setFormData({ mobile: '', mpin: '' })
      navigation.reset({
      index:0,
      routes:[{name:'HomePage'}],
    })
    } else {
      ToastAndroid.showWithGravity(result.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
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

        <Button title="Login" onPress={handleSubmit} />
        <Button title="Signup/Register" onPress={() => navigation.navigate('SignupPage')} />
      </View>
    </ScrollView>
  )
}

export default LoginPage

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
