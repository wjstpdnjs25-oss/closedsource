import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  View,
  Pressable,
} from 'react-native';

function NotificationScreen({ styles }) {
  const [budgetAlert, setBudgetAlert] =
    useState(true);

  const [overAlert, setOverAlert] =
    useState(true);

  const [wishAlert, setWishAlert] =
    useState(false);

  const ToggleRow = ({
    title,
    value,
    onPress,
  }) => (
    <Pressable
      style={styles.notificationRow}
      onPress={onPress}
    >
      <Text style={styles.notificationText}>
        {title}
      </Text>

      <View
        style={[
          styles.toggle,
          value &&
            styles.toggleActive,
        ]}
      >
        <View
          style={[
            styles.toggleCircle,
            value &&
              styles.toggleCircleActive,
          ]}
        />
      </View>
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        알림 설정
      </Text>

      <View style={styles.settingMenuCard}>
        <ToggleRow
          title="예산 70% 알림"
          value={budgetAlert}
          onPress={() =>
            setBudgetAlert(!budgetAlert)
          }
        />

        <ToggleRow
          title="예산 초과 알림"
          value={overAlert}
          onPress={() =>
            setOverAlert(!overAlert)
          }
        />

        <ToggleRow
          title="위시세이브 알림"
          value={wishAlert}
          onPress={() =>
            setWishAlert(!wishAlert)
          }
        />
      </View>
    </ScrollView>
  );
}

export default NotificationScreen;
