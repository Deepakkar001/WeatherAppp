import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = ({ children, style, variant = 'default' }) => {
  return (
    <View style={[styles.card, styles[variant], style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  default: { backgroundColor: 'white' },
  dark: { backgroundColor: 'black' },
  primary: { backgroundColor: '#007bff' }
})

export default Card
