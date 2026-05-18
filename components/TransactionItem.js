import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
} from 'react-native';

function formatWon(num) {
  return `₩ ${num.toLocaleString()}`;
}

function TransactionItem({
  item,
  styles,
  onDelete,
}) {
  const [showMenu, setShowMenu] =
    useState(false);

  return (
    <View style={styles.transactionRow}>
      <View style={styles.transactionLeft}>
        <View>
          <Text style={styles.transactionTitle}>
            {item.type === 'income'
              ? '수입'
              : '지출'}{' '}
            · {item.category}
          </Text>

          <Text style={styles.transactionDate}>
            {item.date}
          </Text>
        </View>
      </View>

      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            item.type === 'income'
              ? styles.incomeText
              : styles.expenseText,
          ]}
        >
          {item.type === 'income'
            ? '+'
            : '-'}
          {formatWon(item.amount)}
        </Text>

        <View>
          <Pressable
            onPress={() =>
              setShowMenu(!showMenu)
            }
          >
            <Text style={styles.moreButton}>
              ⋯
            </Text>
          </Pressable>

          {showMenu && (
            <Pressable
              style={styles.deleteMenu}
              onPress={() => {
                onDelete();
                setShowMenu(false);
              }}
            >
              <Text
                style={styles.deleteMenuText}
              >
                삭제
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

export default TransactionItem;