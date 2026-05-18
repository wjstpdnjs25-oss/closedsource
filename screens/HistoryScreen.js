import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from 'react-native';

import TransactionItem from '../components/TransactionItem';

function HistoryScreen({
  transactions,
  styles,
  deleteTransaction,
}) {
  const [filter, setFilter] = useState('all');

  const today = new Date();

  const filteredTransactions =
    transactions.filter((item) => {
      const itemDate = new Date(item.date);

      if (filter === '7days') {
        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(
          today.getDate() - 7
        );

        return itemDate >= sevenDaysAgo;
      }

      if (filter === '30days') {
        const thirtyDaysAgo = new Date();

        thirtyDaysAgo.setDate(
          today.getDate() - 30
        );

        return itemDate >= thirtyDaysAgo;
      }

      if (filter === 'month') {
        return (
          itemDate.getFullYear() ===
            today.getFullYear() &&
          itemDate.getMonth() ===
            today.getMonth()
        );
      }

      return true;
    });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        전체 내역
      </Text>

      <View style={styles.filterRow}>
        {[
          ['all', '전체'],
          ['7days', '최근 7일'],
          ['30days', '최근 30일'],
          ['month', '이번 달'],
        ].map(([key, label]) => (
          <Pressable
            key={key}
            style={[
              styles.filterChip,
              filter === key &&
                styles.selectedFilterChip,
            ]}
            onPress={() => setFilter(key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === key &&
                  styles.selectedFilterText,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.historyCard}>
        {filteredTransactions.length ===
        0 ? (
          <Text style={styles.emptyText}>
            해당 기간의 내역이 없어요.
          </Text>
        ) : (
          filteredTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              item={item}
              styles={styles}
              onDelete={() =>
                deleteTransaction(item.id)
              }
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

export default HistoryScreen;
