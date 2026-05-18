import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from 'react-native';

function formatWon(num) {
  return `₩ ${num.toLocaleString()}`;
}

function HomeScreen({
  navigation,
  balance,
  budgets,
  spent,
  wish,
  styles,
}) {
  const totalBudget = Object.values(budgets).reduce(
    (sum, value) => sum + value,
    0
  );

  const usageRate =
    totalBudget > 0
      ? Math.min((spent / totalBudget) * 100, 100)
      : 0;

  let alertTitle = '예산을 설정해 주세요';
  let alertMessage =
    '카테고리별 예산을 설정하면 소비 알림을 받을 수 있어요.';
  let alertColor = '#5B7BEF';
  let alertEmoji = '📌';

  if (totalBudget > 0 && usageRate < 70) {
    alertTitle = '예산 사용 안정';
    alertMessage = `현재 예산 사용률 ${usageRate.toFixed(0)}%`;
    alertColor = '#3FA56A';
    alertEmoji = '✅';
  } else if (usageRate >= 70 && usageRate < 90) {
    alertTitle = '예산 사용 주의';
    alertMessage = `예산의 ${usageRate.toFixed(0)}%를 사용했어요.`;
    alertColor = '#E6A700';
    alertEmoji = '⚠️';
  } else if (usageRate >= 90 && usageRate < 100) {
    alertTitle = '예산 소진 위험';
    alertMessage = `예산 초과까지 ₩ ${(totalBudget - spent).toLocaleString()} 남았어요.`;
    alertColor = '#F57C00';
    alertEmoji = '🚨';
  } else if (usageRate >= 100) {
    alertTitle = '예산 초과';
    alertMessage = `₩ ${(spent - totalBudget).toLocaleString()} 초과 사용 중이에요.`;
    alertColor = '#D13B3B';
    alertEmoji = '🚨';
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.homeHeader}>
        <Text style={styles.title}>내 계좌</Text>

        <Pressable
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingIcon}>⚙️</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>총 잔액</Text>

        <Text style={styles.bigMoney}>
          {formatWon(balance)}
        </Text>

        <View style={styles.line} />

        <Text style={styles.label}>
          이번 달 사용 금액
        </Text>

        <Text style={styles.mediumMoney}>
          {formatWon(spent)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          이번 달 예산
        </Text>

        <Text style={styles.subText}>
          {formatWon(totalBudget)} 중
        </Text>

        <Text style={styles.mediumMoney}>
          {formatWon(spent)} 사용
        </Text>
      </View>

      <Pressable
        style={[
          styles.smallAlertCard,
          { borderLeftColor: alertColor },
        ]}
        onPress={() => navigation.navigate('Budget')}
      >
        <View style={styles.alertTopRow}>
          <Text style={styles.smallAlertTitle}>
            {alertEmoji} {alertTitle}
          </Text>

          <Text style={styles.detailLink}>
            자세히 보기
          </Text>
        </View>

        <Text style={styles.smallAlertText}>
          {alertMessage}
        </Text>

        <View style={styles.smallProgressBackground}>
          <View
            style={[
              styles.smallProgressFill,
              {
                width: `${usageRate}%`,
                backgroundColor: alertColor,
              },
            ]}
          />
        </View>
      </Pressable>

      <Text style={styles.sectionTitle}>
        바로가기
      </Text>

      <Pressable
        style={styles.menuCard}
        onPress={() =>
          navigation.navigate('TransactionInput')
        }
      >
        <Text style={styles.menuTitle}>
          내역 입력
        </Text>

        <Text style={styles.menuSub}>
          수입과 지출을 입력하고 최근 내역을 확인해요
        </Text>
      </Pressable>

      <Pressable
        style={styles.menuCard}
        onPress={() => navigation.navigate('Budget')}
      >
        <Text style={styles.menuTitle}>
          예산 설정
        </Text>

        <Text style={styles.menuSub}>
          카테고리별 예산과 사용률을 확인해요
        </Text>
      </Pressable>

      <Pressable
        style={styles.menuCard}
        onPress={() => navigation.navigate('Wish')}
      >
        <Text style={styles.menuTitle}>
          위시세이브
        </Text>

        <Text style={styles.menuSub}>
          사고 싶은 물건의 목표 금액을 입력해요
        </Text>
      </Pressable>

      {wish > 0 && (
        <View style={styles.wishCard}>
          <Text style={styles.wishTitle}>
            위시세이브 목표
          </Text>

          <Text style={styles.wishMoney}>
            {formatWon(wish)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default HomeScreen;