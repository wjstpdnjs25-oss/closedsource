import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function formatWon(num) {
  return `₩ ${num.toLocaleString()}`;
}

function HomeScreen({ navigation, balance, budget, spent, wish, transactions }) {
  const overAmount = spent - budget;
  const recentTransactions = transactions.slice(0, 4);

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

      <View style={styles.historyHeader}>
        <Text style={styles.sectionTitle}>최근 내역</Text>
        <Pressable onPress={() => navigation.navigate('History')}>
          <Text style={styles.linkText}>더보기</Text>
        </Pressable>
      </View>

      <View style={styles.historyCard}>
        {recentTransactions.length === 0 ? (
          <Text style={styles.emptyText}>아직 입력된 내역이 없어요.</Text>
        ) : (
          recentTransactions.map((item) => <TransactionItem key={item.id} item={item} />)
        )}
      </View>

      <Text style={styles.sectionTitle}>바로가기</Text>

      <Pressable style={styles.menuCard} onPress={() => navigation.navigate('TransactionInput')}>
        <Text style={styles.menuTitle}>내역 입력</Text>
        <Text style={styles.menuSub}>수입과 지출을 입력해요</Text>
      </Pressable>

      <Pressable style={styles.menuCard} onPress={() => navigation.navigate('Budget')}>
        <Text style={styles.menuTitle}>예산 설정</Text>
        <Text style={styles.menuSub}>이번 달 예산을 설정해요</Text>
      </Pressable>

      <Pressable style={styles.menuCard} onPress={() => navigation.navigate('Wish')}>
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

function TransactionItem({ item }) {
  return (
    <View style={styles.transactionRow}>
      <View>
        <Text style={styles.transactionTitle}>
          {item.type === 'income' ? '수입' : '지출'} · {item.category}
        </Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          item.type === 'income' ? styles.incomeText : styles.expenseText,
        ]}
      >
        {item.type === 'income' ? '+' : '-'}
        {formatWon(item.amount)}
      </Text>
    </View>
  );
}

function TransactionInputScreen({ navigation, addTransaction }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const saveTransaction = () => {
    const numberAmount = Number(amount) || 0;
    if (numberAmount <= 0) return;

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: numberAmount,
      category: category || (type === 'income' ? '수입' : '기타'),
      date: new Date().toISOString().slice(0, 10),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>내역 입력</Text>

      <View style={styles.inputCard}>
        <View style={styles.typeRow}>
          <Pressable
            style={[styles.typeButton, type === 'income' && styles.selectedButton]}
            onPress={() => setType('income')}
          >
            <Text style={[styles.typeText, type === 'income' && styles.selectedText]}>
              수입
            </Text>
          </Pressable>

          <Pressable
            style={[styles.typeButton, type === 'expense' && styles.selectedButton]}
            onPress={() => setType('expense')}
          >
            <Text style={[styles.typeText, type === 'expense' && styles.selectedText]}>
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

        <TextInput
          style={styles.input}
          placeholder="카테고리 입력 예: 식비, 교통, 용돈"
          value={category}
          onChangeText={setCategory}
        />

        <Pressable style={styles.saveButton} onPress={saveTransaction}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SimpleInputScreen({ route, navigation }) {
  const { title, placeholder, onSave } = route.params;
  const [value, setValue] = useState('');

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputCard}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <Pressable
          style={styles.saveButton}
          onPress={() => {
            onSave(Number(value) || 0);
            navigation.goBack();
          }}
        >
          <Text style={styles.saveButtonText}>저장하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

function HistoryScreen({ transactions }) {
  const [filter, setFilter] = useState('all');

  const today = new Date();

  const filteredTransactions = transactions.filter((item) => {
    const itemDate = new Date(item.date);

    if (filter === '7days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return itemDate >= sevenDaysAgo;
    }

    if (filter === '30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return itemDate >= thirtyDaysAgo;
    }

    if (filter === 'month') {
      return (
        itemDate.getFullYear() === today.getFullYear() &&
        itemDate.getMonth() === today.getMonth()
      );
    }

    return true;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>전체 내역</Text>

      <View style={styles.filterRow}>
        <Pressable
          style={[styles.filterChip, filter === 'all' && styles.selectedFilterChip]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.selectedFilterText]}>
            전체
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterChip, filter === '7days' && styles.selectedFilterChip]}
          onPress={() => setFilter('7days')}
        >
          <Text style={[styles.filterText, filter === '7days' && styles.selectedFilterText]}>
            최근 7일
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterChip, filter === '30days' && styles.selectedFilterChip]}
          onPress={() => setFilter('30days')}
        >
          <Text style={[styles.filterText, filter === '30days' && styles.selectedFilterText]}>
            최근 30일
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterChip, filter === 'month' && styles.selectedFilterChip]}
          onPress={() => setFilter('month')}
        >
          <Text style={[styles.filterText, filter === 'month' && styles.selectedFilterText]}>
            이번 달
          </Text>
        </Pressable>
      </View>

      <View style={styles.historyCard}>
        {filteredTransactions.length === 0 ? (
          <Text style={styles.emptyText}>해당 기간의 내역이 없어요.</Text>
        ) : (
          filteredTransactions.map((item) => <TransactionItem key={item.id} item={item} />)
        )}
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [balance, setBalance] = useState(0);
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [wish, setWish] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);

    if (transaction.type === 'income') {
      setBalance((prev) => prev + transaction.amount);
    } else {
      setSpent((prev) => prev + transaction.amount);
      setBalance((prev) => prev - transaction.amount);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen
              {...props}
              balance={balance}
              budget={budget}
              spent={spent}
              wish={wish}
              transactions={transactions}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TransactionInput" options={{ title: '내역 입력' }}>
          {(props) => (
            <TransactionInputScreen {...props} addTransaction={addTransaction} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Budget" options={{ title: '예산 설정' }}>
          {(props) => (
            <SimpleInputScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  title: '예산 설정',
                  placeholder: '이번 달 예산 입력',
                  onSave: setBudget,
                },
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Wish" options={{ title: '위시세이브' }}>
          {(props) => (
            <SimpleInputScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  title: '위시세이브',
                  placeholder: '목표 금액 입력',
                  onSave: setWish,
                },
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="History" options={{ title: '전체 내역' }}>
          {(props) => <HistoryScreen {...props} transactions={transactions} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 24,
  },

  content: {
    paddingTop: 70,
    paddingBottom: 40,
  },

  inputContainer: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
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
    marginBottom: 22,
  },

  bigMoney: {
    fontSize: 42,
    fontWeight: '900',
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
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: '900',
    marginBottom: 28,
  },

  subText: {
    fontSize: 19,
    marginBottom: 16,
  },

  alertMain: {
    fontSize: 18,
    fontWeight: '800',
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

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  linkText: {
    color: '#1F4F91',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 16,
  },

  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  emptyText: {
    color: '#777',
    fontSize: 15,
  },

  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
    paddingVertical: 14,
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },

  transactionDate: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: '900',
  },

  incomeText: {
    color: '#1F7A4D',
  },

  expenseText: {
    color: '#D13B3B',
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

  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
  },

  typeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
  },

  selectedButton: {
    backgroundColor: '#5B7BEF',
  },

  typeText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#333',
  },

  selectedText: {
    color: '#FFFFFF',
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
  },

  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
  },

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },

  filterChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  selectedFilterChip: {
    backgroundColor: '#5B7BEF',
  },

  filterText: {
    fontWeight: '800',
    color: '#1F4F91',
  },

  selectedFilterText: {
    color: '#FFFFFF',
  },
});