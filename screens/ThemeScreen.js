import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  View,
  Pressable,
} from 'react-native';

function ThemeScreen({ styles }) {
  const [selectedTheme, setSelectedTheme] =
    useState('light');

  const ThemeButton = ({
    title,
    value,
  }) => (
    <Pressable
      style={[
        styles.themeCard,
        selectedTheme === value &&
          styles.selectedThemeCard,
      ]}
      onPress={() =>
        setSelectedTheme(value)
      }
    >
      <Text
        style={[
          styles.themeTitle,
          selectedTheme === value &&
            styles.selectedThemeTitle,
        ]}
      >
        {title}
      </Text>

      {selectedTheme === value && (
        <Text style={styles.themeCheck}>
          ✓
        </Text>
      )}
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        테마 설정
      </Text>

      <ThemeButton
        title="라이트 모드"
        value="light"
      />

      <ThemeButton
        title="다크 모드"
        value="dark"
      />

      <ThemeButton
        title="시스템 설정 따르기"
        value="system"
      />
    </ScrollView>
  );
}

export default ThemeScreen;