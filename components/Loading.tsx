import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingProps {
  text?: string;
}

export default function Loading({ text }: LoadingProps) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-black/10">
      <ActivityIndicator size="large" />
      {text && <Text className="mt-3">{text}</Text>}
    </View>
  );
}