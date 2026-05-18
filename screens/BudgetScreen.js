import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

function formatWon(num) {
  return `₩ ${num.toLocaleString()}`;
}

function getCategorySpent(transactions, category) {
  return transactions
    .filter(
      (item) =>
        item.type === 'expense' &&
        item.category === category
    )
    .reduce((sum, item) => sum + item.amount, 0);
}

function BudgetScreen({
  budgets,
  setBudgets,
  transactions,
  categories,
  styles,
}) {
  const [editingCategory, setEditingCategory] =
    useState(null);

  const [inputValue, setInputValue] =
    useState('');

  const totalBudget = Object.values(budgets).reduce(
    (sum, value) => sum + value,
    0
  );

  const totalSpent = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalRate =
    totalBudget > 0
      ? Math.min(
          (totalSpent / totalBudget) * 100,
          100
        )
      : 0;

  const startEdit = (category) => {
    setEditingCategory(category);

    setInputValue(
      String(budgets[category] || 0)
    );
  };

  const saveBudget = (category) => {
    const numberValue =
      Number(inputValue) || 0;

    setBudgets((prev) => ({
      ...prev,
      [category]: numberValue,
    }));

    setEditingCategory(null);
    setInputValue('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        예산 설정
      </Text>

      <View style={styles.detailCard}>
        <Text style={styles.cardTitle}>
          전체 예산 사용률
        </Text>

        <Text style={styles.mediumMoney}>
          {totalRate.toFixed(0)}%
        </Text>

        <Text style={styles.subText}>
          {formatWon(totalBudget)} 중{' '}
          {formatWon(totalSpent)} 사용
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${totalRate}%`,
              },
            ]}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        카테고리별 예산
      </Text>

      <View style={styles.historyCard}>
        {categories.length === 0 ? (
          <Text style={styles.emptyText}>
            설정에서 카테고리를 추가해 주세요.
          </Text>
        ) : (
          categories.map((category) => {
            const categoryBudget =
              budgets[category] || 0;

            const categorySpent =
              getCategorySpent(
                transactions,
                category
              );

            const categoryRate =
              categoryBudget > 0
                ? Math.min(
                    (categorySpent /
                      categoryBudget) *
                      100,
                    100
                  )
                : 0;

            return (
              <View
                key={category}
                style={styles.budgetBlock}
              >
                <View
                  style={styles.budgetTopRow}
                >
                  <View>
                    <Text
                      style={
                        styles.transactionTitle
                      }
                    >
                      {category}
                    </Text>

                    {editingCategory ===
                    category ? (
                      <TextInput
                        style={
                          styles.budgetInput
                        }
                        keyboardType="numeric"
                        value={inputValue}
                        onChangeText={
                          setInputValue
                        }
                        placeholder="예산 입력"
                      />
                    ) : (
                      <Text
                        style={
                          styles.transactionDate
                        }
                      >
                        {formatWon(
                          categoryBudget
                        )}{' '}
                        중{' '}
                        {formatWon(
                          categorySpent
                        )}{' '}
                        사용
                      </Text>
                    )}
                  </View>

                  {editingCategory ===
                  category ? (
                    <Pressable
                      style={
                        styles.changeButton
                      }
                      onPress={() =>
                        saveBudget(category)
                      }
                    >
                      <Text
                        style={
                          styles.changeButtonText
                        }
                      >
                        저장
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={
                        styles.changeButton
                      }
                      onPress={() =>
                        startEdit(category)
                      }
                    >
                      <Text
                        style={
                          styles.changeButtonText
                        }
                      >
                        변경
                      </Text>
                    </Pressable>
                  )}
                </View>

                <View
                  style={
                    styles.categoryProgressBackground
                  }
                >
                  <View
                    style={[
                      styles.categoryProgressFill,
                      {
                        width: `${categoryRate}%`,
                      },
                    ]}
                  />
                </View>

                <Text
                  style={styles.progressText}
                >
                  사용률{' '}
                  {categoryRate.toFixed(0)}%
                </Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

export default BudgetScreen;
