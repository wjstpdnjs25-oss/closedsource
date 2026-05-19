import React from 'react';

import {
  ScrollView,
  Text,
  Pressable,
  View,
} from 'react-native';

function SettingsScreen({
  navigation,
  styles,
}) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        설정
      </Text>

      <View style={styles.settingMenuCard}>
        <Pressable
          style={styles.settingMenuRow}
          onPress={() =>
            navigation.navigate(
              'CategoryManage'
            )
          }
        >
          <Text style={styles.settingMenuText}>
            카테고리 관리
          </Text>

          <Text style={styles.settingArrow}>
            ›
          </Text>
        </Pressable>

        <Pressable style={styles.settingMenuRow}>
          <Text style={styles.settingMenuText}>
            알림 설정
          </Text>

          <Text style={styles.settingArrow}>
            ›
          </Text>
        </Pressable>

        <Pressable style={styles.settingMenuRow}>
          <Text style={styles.settingMenuText}>
            테마
          </Text>

          <Text style={styles.settingArrow}>
            ›
          </Text>
        </Pressable>

        <Pressable style={styles.settingMenuRow}>
          <Text style={styles.settingMenuText}>
            데이터 관리
          </Text>

          <Text style={styles.settingArrow}>
            ›
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default SettingsScreen;