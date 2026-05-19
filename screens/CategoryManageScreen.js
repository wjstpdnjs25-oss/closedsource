import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';

function CategoryManageScreen({
  categories,
  addCategory,
  removeCategory,
  styles,
}) {
  const [newCategory, setNewCategory] =
    useState('');

  const saveCategory = () => {
    const trimmed =
      newCategory.trim();

    if (!trimmed) return;

    addCategory(trimmed);

    setNewCategory('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.inputCard}>
        <Text style={styles.cardTitle}>
          카테고리 추가
        </Text>

        <TextInput
          style={styles.input}
          placeholder="새 카테고리 입력"
          value={newCategory}
          onChangeText={setNewCategory}
        />

        <Pressable
          style={styles.saveButton}
          onPress={saveCategory}
        >
          <Text style={styles.saveButtonText}>
            카테고리 추가하기
          </Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>
        카테고리 관리
      </Text>

      <View style={styles.historyCard}>
        {categories.length === 0 ? (
          <Text style={styles.emptyText}>
            등록된 카테고리가 없어요.
          </Text>
        ) : (
          categories.map((category) => (
            <View
              key={category}
              style={
                styles.settingCategoryRow
              }
            >
              <Text
                style={
                  styles.transactionTitle
                }
              >
                {category}
              </Text>

              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  removeCategory(category)
                }
              >
                <Text
                  style={
                    styles.deleteButtonText
                  }
                >
                  삭제
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

export default CategoryManageScreen;