import { View, Text, StyleSheet } from 'react-native';

export default function UsageCompareCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>사용 비교</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef0fa',
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});