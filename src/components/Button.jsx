import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, styles[variant], style, disabled && styles.disabled]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  primary: { backgroundColor: "#007bff" },
  success: { backgroundColor: "#28a745" },
  danger: { backgroundColor: "#dc3545" },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  primaryText: { color: "#ffffff" },
  successText: { color: "#ffffff" },
  dangerText: { color: "#ffffff" },
  disabled: { opacity: 0.6 }
})

export default Button
