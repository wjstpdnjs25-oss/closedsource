import { useState } from 'react';
import TransactionItem from './components/TransactionItem';
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import TransactionInputScreen from './screens/TransactionInputScreen';
import BudgetScreen from './screens/BudgetScreen';
import HistoryScreen from './screens/HistoryScreen';
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


function getCategorySpent(transactions, category) {
  return transactions
    .filter((item) => item.type === 'expense' && item.category === category)
    .reduce((sum, item) => sum + item.amount, 0);
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


export default function App() {
  const [balance, setBalance] = useState(0);

  const [categories, setCategories] = useState(['식비', '교통', '카페', '쇼핑']);

  const [budgets, setBudgets] = useState({
    식비: 0,
    교통: 0,
    카페: 0,
    쇼핑: 0,
  });

  const [spent, setSpent] = useState(0);
  const [wish, setWish] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const addCategory = (category) => {
    if (categories.includes(category)) return;

    setCategories((prev) => [...prev, category]);

    setBudgets((prev) => ({
      ...prev,
      [category]: 0,
    }));
  };

  const removeCategory = (category) => {
    setCategories((prev) => prev.filter((item) => item !== category));

    setBudgets((prev) => {
      const copied = { ...prev };
      delete copied[category];
      return copied;
    });
  };

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
              budgets={budgets}
              spent={spent}
              wish={wish}
              transactions={transactions}
              styles={styles}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TransactionInput" options={{ title: '내역 입력' }}>
          {(props) => (
            <TransactionInputScreen
              {...props}
              addTransaction={addTransaction}
              transactions={transactions}
              categories={categories}
              styles={styles}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Budget" options={{ title: '예산 설정' }}>
          {(props) => (
            <BudgetScreen
              {...props}
              budgets={budgets}
              setBudgets={setBudgets}
              transactions={transactions}
              categories={categories}
              styles={styles}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings" options={{ title: '설정' }}>
          {(props) => (
            <SettingsScreen
              {...props}
              categories={categories}
              addCategory={addCategory}
              removeCategory={removeCategory}
              styles={styles}
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
          {(props) => <HistoryScreen 
          {...props} 
          transactions={transactions}
          styles={styles} 
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD', paddingHorizontal: 24 },
  content: { paddingTop: 70, paddingBottom: 40 },

  inputContainer: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  settingIcon: {
    fontSize: 28,
    marginBottom: 36,
  },

  title: { fontSize: 30, fontWeight: '900', marginBottom: 36 },
  card: { backgroundColor: '#EEF2FF', borderRadius: 22, padding: 28, marginBottom: 24 },
  label: { fontSize: 18, marginBottom: 22 },
  bigMoney: { fontSize: 42, fontWeight: '900', marginBottom: 36 },
  line: { height: 1, backgroundColor: '#DDE3F3', marginVertical: 22 },
  mediumMoney: { fontSize: 26, fontWeight: '900' },
  cardTitle: { fontSize: 23, fontWeight: '900', marginBottom: 20 },
  subText: { fontSize: 16, color: '#666', marginTop: 8 },

  smallAlertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 7,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  alertTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  smallAlertTitle: { fontSize: 18, fontWeight: '900', flex: 1 },
  smallAlertText: { color: '#666', marginTop: 8, marginBottom: 14 },
  detailLink: { color: '#1F4F91', fontWeight: '900', fontSize: 14 },

  smallProgressBackground: {
    height: 8,
    backgroundColor: '#E6EAF2',
    borderRadius: 999,
    overflow: 'hidden',
  },

  smallProgressFill: { height: '100%', borderRadius: 999 },

  progressBackground: {
    height: 14,
    backgroundColor: '#E6EAF2',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 18,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#5B7BEF',
    borderRadius: 999,
  },

  categoryProgressBackground: {
    height: 9,
    backgroundColor: '#E6EAF2',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 14,
  },

  categoryProgressFill: {
    height: '100%',
    backgroundColor: '#5B7BEF',
    borderRadius: 999,
  },

  progressText: { color: '#666', fontWeight: '800', marginTop: 8, fontSize: 13 },

  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  sectionTitle: { fontSize: 23, fontWeight: '900', marginBottom: 16 },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  menuTitle: { fontSize: 20, fontWeight: '900', marginBottom: 8 },
  menuSub: { fontSize: 15, color: '#666' },

  wishCard: { backgroundColor: '#EEF2FF', borderRadius: 22, padding: 24, marginTop: 10 },
  wishTitle: { fontSize: 19, fontWeight: '900', marginBottom: 12 },
  wishMoney: { fontSize: 26, fontWeight: '900' },

  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    marginBottom: 28,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },

  typeRow: { flexDirection: 'row', marginBottom: 20 },

  typeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    marginRight: 8,
  },

  selectedButton: { backgroundColor: '#5B7BEF' },
  typeText: { fontSize: 16, fontWeight: '900', color: '#333' },
  selectedText: { color: '#FFFFFF' },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDE3F3',
    paddingVertical: 14,
    fontSize: 17,
    marginBottom: 24,
  },

  categorySelectWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },

  categoryChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedCategoryChip: {
    backgroundColor: '#5B7BEF',
  },

  categoryChipText: {
    fontWeight: '900',
    color: '#1F4F91',
  },

  selectedCategoryChipText: {
    color: '#FFFFFF',
  },

  saveButton: {
    backgroundColor: '#5B7BEF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  saveButtonText: { color: 'white', fontSize: 17, fontWeight: '900' },

  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  emptyText: { color: '#777', fontSize: 15 },

  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
    paddingVertical: 14,
  },

  transactionTitle: { fontSize: 16, fontWeight: '800' },
  transactionDate: { fontSize: 13, color: '#777', marginTop: 4 },
  transactionAmount: { fontSize: 16, fontWeight: '900' },
  incomeText: { color: '#1F7A4D' },
  expenseText: { color: '#D13B3B' },

  subButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  subButtonText: { color: '#1F4F91', fontWeight: '900', fontSize: 16 },

  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 18 },

  filterChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedFilterChip: { backgroundColor: '#5B7BEF' },
  filterText: { fontWeight: '800', color: '#1F4F91' },
  selectedFilterText: { color: '#FFFFFF' },

  budgetBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
    paddingVertical: 18,
  },

  budgetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  budgetInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDE3F3',
    paddingVertical: 6,
    minWidth: 120,
    fontSize: 16,
  },

  changeButton: {
    backgroundColor: '#5B7BEF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },

  changeButtonText: { color: 'white', fontWeight: '900' },

  settingCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
    paddingVertical: 14,
  },

  deleteButton: {
    backgroundColor: '#FFE1E1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },

  deleteButtonText: {
    color: '#D13B3B',
    fontWeight: '900',
  },
});