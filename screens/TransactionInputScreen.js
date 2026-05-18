import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import TransactionItem from '../components/TransactionItem';

function formatWon(num) {
  return `₩ ${num.toLocaleString()}`;
}

function TransactionInputScreen({
  navigation,
  addTransaction,
  transactions,
  categories,
  styles,
}) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || ''
  );

  const recentTransactions = transactions.slice(0, 5);

  const categorySummary = transactions.reduce((acc, item) => {
    const key = `${item.type}-${item.category}`;

    if (!acc[key]) {
      acc[key] = {
        type: item.type,
        category: item.category,
        total: 0,
        count: 0,
      };
    }

    acc[key].total += item.amount;
    acc[key].count += 1;

    return acc;
  }, {});

  const categoryList = Object.values(categorySummary).slice(0, 5);

  const saveTransaction = () => {
    const numberAmount = Number(amount) || 0;

    if (numberAmount <= 0 || !selectedCategory) return;

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: numberAmount,
      category: selectedCategory,
      date: new Date().toISOString().slice(0, 10),
    });

    setAmount('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>내역 입력</Text>

      <View style={styles.inputCard}>
        <View style={styles.typeRow}>
          <Pressable
            style={[
              styles.typeButton,
              type === 'income' && styles.selectedButton,
            ]}
            onPress={() => setType('income')}
          >
            <Text
              style={[
                styles.typeText,
                type === 'income' && styles.selectedText,
              ]}
            >
              수입
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.typeButton,
              type === 'expense' && styles.selectedButton,
            ]}
            onPress={() => setType('expense')}
          >
            <Text
              style={[
                styles.typeText,
                type === 'expense' && styles.selectedText,
              ]}
            >
              지출
            </Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.input}
          placeholder="금액 입력"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.inputLabel}>
          카테고리 선택
        </Text>

        <View style={styles.categorySelectWrap}>
          {categories.length === 0 ? (
            <Text style={styles.emptyText}>
              설정에서 카테고리를 추가해 주세요.
            </Text>
          ) : (
            categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category &&
                    styles.selectedCategoryChip,
                ]}
                onPress={() =>
                  setSelectedCategory(category)
                }
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category &&
                      styles.selectedCategoryChipText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))
          )}
        </View>

        <Pressable
          style={styles.saveButton}
          onPress={saveTransaction}
        >
          <Text style={styles.saveButtonText}>
            저장하기
          </Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>
        최근 카테고리별 요약
      </Text>

      <View style={styles.historyCard}>
        {categoryList.length === 0 ? (
          <Text style={styles.emptyText}>
            아직 입력된 내역이 없어요.
          </Text>
        ) : (
          categoryList.map((item) => (
            <View
              key={`${item.type}-${item.category}`}
              style={styles.transactionRow}
            >
              <View>
                <Text style={styles.transactionTitle}>
                  {item.type === 'income'
                    ? '수입'
                    : '지출'}{' '}
                  · {item.category}
                </Text>

                <Text style={styles.transactionDate}>
                  총 {item.count}건
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
                {formatWon(item.total)}
              </Text>
            </View>
          ))
        )}
      </View>

      <Text style={styles.sectionTitle}>
        최근 입력 내역
      </Text>

      <View style={styles.historyCard}>
        {recentTransactions.length === 0 ? (
          <Text style={styles.emptyText}>
            아직 입력된 내역이 없어요.
          </Text>
        ) : (
          recentTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              item={item}
              styles={styles}
            />
          ))
        )}
      </View>

      <Pressable
        style={styles.subButton}
        onPress={() =>
          navigation.navigate('History')
        }
      >
        <Text style={styles.subButtonText}>
          전체 내역 더보기
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default TransactionInputScreen;
