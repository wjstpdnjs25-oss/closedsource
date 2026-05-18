import React from 'react';
import { View, Text } from 'react-native';

function formatWon(num) {
  return `₩ ${num.toLocaleString()}`;
}

function TransactionItem({ item, styles }) {
  return (
    <View style={styles.transactionRow}>
      <View>
        <Text style={styles.transactionTitle}>
          {item.type === 'income' ? '수입' : '지출'} · {item.category}
        </Text>

        <Text style={styles.transactionDate}>
          {item.date}
        </Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          item.type === 'income'
            ? styles.incomeText
            : styles.expenseText,
        ]}
      >
        {item.type === 'income' ? '+' : '-'}
        {formatWon(item.amount)}
      </Text>
    </View>
  );
}

export default TransactionItem;
