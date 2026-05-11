import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'expense') return <SimplePage title="지출 입력" setPage={setPage} />;
  if (page === 'budget') return <SimplePage title="예산 설정" setPage={setPage} />;
  if (page === 'wish') return <SimplePage title="위시세이브" setPage={setPage} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>내 계좌</Text>

      <View style={styles.card}>
        <Text style={styles.label}>총 잔액</Text>
        <Text style={styles.bigMoney}>₩ 0</Text>

        <View style={styles.line} />

        <Text style={styles.label}>이번 달 사용 금액</Text>
        <Text style={styles.mediumMoney}>₩ 0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>이번 달 예산</Text>
        <Text style={styles.subText}>₩ 0 중</Text>
        <Text style={styles.mediumMoney}>₩ 0 사용</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>예산 초과 알림</Text>
        <Text style={styles.alertMain}>아직 예산 초과 내역이 없어요</Text>
        <Text style={styles.alertSub}>지출과 예산을 설정하면 알림이 표시돼요.</Text>
      </View>

      <Text style={styles.sectionTitle}>바로가기</Text>

      <TouchableOpacity style={styles.menuCard} onPress={() => setPage('expense')}>
        <Text style={styles.menuTitle}>지출 입력</Text>
        <Text style={styles.menuSub}>오늘 사용한 금액을 입력해요</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard} onPress={() => setPage('budget')}>
        <Text style={styles.menuTitle}>예산 설정</Text>
        <Text style={styles.menuSub}>이번 달 예산을 설정해요</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard} onPress={() => setPage('wish')}>
        <Text style={styles.menuTitle}>위시세이브</Text>
        <Text style={styles.menuSub}>사고 싶은 물건의 저축 계획을 세워요</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SimplePage({ title, setPage }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => setPage('home')}>
        <Text style={styles.back}>‹ 뒤로가기</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputCard}>
        <Text style={styles.inputTitle}>{title}</Text>
        <TextInput style={styles.input} placeholder="금액을 입력하세요" keyboardType="numeric" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
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

  button: {
    backgroundColor: '#5B7BEF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
  },
});
