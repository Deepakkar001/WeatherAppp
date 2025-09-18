import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  secureTextEntry = false,
  required = false,
  error,
  ...props
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || `Enter ${label}`}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: 8, paddingHorizontal: 16 },
  label: { marginBottom: 4, fontSize: 14, fontWeight: '500', color: '#333' },
  required: { color: 'red' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: 'red' },
  error: { color: 'red', marginTop: 4, fontSize: 12 },
});
