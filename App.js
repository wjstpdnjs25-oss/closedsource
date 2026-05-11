import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';

export default function App() {
  const [page, setPage] = useState('home');

  const [balance, setBalance] = useState(0);
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [wish, setWish] = useState(0);

  const [inputValue, setInputValue] = useState('');

  const formatWon = (num) => `₩ ${num.toLocaleString()}`;
  const overAmount = spent - budget;

  const openPage = (pageName) => {
    setInputValue('');
    setPage(pageName);
  };

  const saveValue = () => {
    const numberValue = Number(inputValue) || 0;

    if (page === 'balance') setBalance(numberValue);
    if (page === 'expense') setSpent(numberValue);
    if (page === 'budget') setBudget(numberValue);
    if (page === 'wish') setWish(numberValue);

    setInputValue('');
    setPage('home');
  };

  if (page !== 'home') {
    const pageTitle =
      page === 'balance'
        ? '잔액 입력'
        : page === 'expense'
        ? '지출 입력'
        : page === 'budget'
        ? '예산 설정'
        : '위시세이브';

    const placeholder =
      page === 'balance'
        ? '총 잔액 입력'
        : page === 'expense'
        ? '이번 달 사용 금액 입력'
        : page === 'budget'
        ? '이번 달 예산 입력'
        : '목표 금액 입력';

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable onPress={() => setPage('home')}>
          <Text style={styles.back}>‹ 뒤로가기</Text>
        </Pressable>

        <Text style={styles.title}>{pageTitle}</Text>

        <View style={styles.inputCard}>
          <Text style={styles.inputTitle}>{pageTitle}</Text>

          <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={setInputValue}
          />

          <Pressable style={styles.saveButton} onPress={saveValue}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>내 계좌</Text>

      <View style={styles.card}>
        <Text style={styles.label}>총 잔액</Text>
        <Text style={styles.bigMoney}>{formatWon(balance)}</Text>

        <View style={styles.line} />

        <Text style={styles.label}>이번 달 사용 금액</Text>
        <Text style={styles.mediumMoney}>{formatWon(spent)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>이번 달 예산</Text>
        <Text style={styles.subText}>{formatWon(budget)} 중</Text>
        <Text style={styles.mediumMoney}>{formatWon(spent)} 사용</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>예산 초과 알림</Text>

        {budget > 0 && spent > budget ? (
          <>
            <Text style={styles.alertMain}>지출이 예산을 초과했어요</Text>
            <Text style={styles.alertSub}>
              예산보다 {formatWon(overAmount)} 더 사용했어요.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.alertMain}>아직 예산 초과 내역이 없어요</Text>
            <Text style={styles.alertSub}>
              지출과 예산을 설정하면 알림이 표시돼요.
            </Text>
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>바로가기</Text>

      <Pressable style={styles.menuCard} onPress={() => openPage('balance')}>
        <Text style={styles.menuTitle}>잔액 입력</Text>
        <Text style={styles.menuSub}>현재 계좌 잔액을 입력해요</Text>
      </Pressable>

      <Pressable style={styles.menuCard} onPress={() => openPage('expense')}>
        <Text style={styles.menuTitle}>지출 입력</Text>
        <Text style={styles.menuSub}>이번 달 사용 금액을 입력해요</Text>
      </Pressable>

      <Pressable style={styles.menuCard} onPress={() => openPage('budget')}>
        <Text style={styles.menuTitle}>예산 설정</Text>
        <Text style={styles.menuSub}>이번 달 예산을 설정해요</Text>
      </Pressable>

      <Pressable style={styles.menuCard} onPress={() => openPage('wish')}>
        <Text style={styles.menuTitle}>위시세이브</Text>
        <Text style={styles.menuSub}>사고 싶은 물건의 목표 금액을 입력해요</Text>
      </Pressable>

      {wish > 0 && (
        <View style={styles.wishCard}>
          <Text style={styles.wishTitle}>위시세이브 목표</Text>
          <Text style={styles.wishMoney}>{formatWon(wish)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  content: { paddingHorizontal: 24, paddingTop: 70, paddingBottom: 40 },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111',
    marginBottom: 36,
  },

  card: {
    backgroundColor: '#EEF2FF',
    borderRadius: 22,
    padding: 28,
    marginBottom: 24,
  },

  label: {
    fontSize: 18,
    color: '#111',
    marginBottom: 22,
  },

  bigMoney: {
    fontSize: 42,
    fontWeight: '900',
    color: '#000',
    marginBottom: 36,
  },

  line: {
    height: 1,
    backgroundColor: '#DDE3F3',
    marginBottom: 28,
  },

  mediumMoney: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#000',
    marginBottom: 28,
  },

  subText: {
    fontSize: 19,
    color: '#222',
    marginBottom: 16,
  },

  alertMain: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },

  alertSub: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: '900',
    marginBottom: 16,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
    marginBottom: 8,
  },

  menuSub: {
    fontSize: 15,
    color: '#666',
  },

  wishCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 22,
    padding: 24,
    marginTop: 10,
  },

  wishTitle: {
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 12,
  },

  wishMoney: {
    fontSize: 26,
    fontWeight: '900',
  },

  back: {
    fontSize: 18,
    color: '#1F4F91',
    marginBottom: 24,
    fontWeight: '700',
  },

  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
  },

  inputTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDE3F3',
    paddingVertical: 14,
    fontSize: 17,
    marginBottom: 24,
  },

  saveButton: {
    backgroundColor: '#5B7BEF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
  },
});
