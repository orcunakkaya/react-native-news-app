import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Haber ara...',
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View
      className={`flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mx-4 my-3 ${
        isFocused ? 'border-2 border-blue-500' : 'border border-transparent'
      }`}
    >
      {/* Search Icon */}
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? '#3b82f6' : '#9ca3af'}
      />

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="flex-1 ml-3 text-base text-gray-900"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <Pressable onPress={handleClear} className="ml-2 active:opacity-50">
          <Ionicons name="close-circle" size={20} color="#9ca3af" />
        </Pressable>
      )}
    </View>
  );
}