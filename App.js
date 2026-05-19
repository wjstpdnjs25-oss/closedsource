import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import TransactionInputScreen from './screens/TransactionInputScreen';
import BudgetScreen from './screens/BudgetScreen';
import SettingsScreen from './screens/SettingsScreen';
import CategoryManageScreen from './screens/CategoryManageScreen';
import HistoryScreen from './screens/HistoryScreen';
import NotificationScreen from './screens/NotificationScreen';

const Stack = createNativeStackNavigator();

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

  const deleteTransaction = (id) => {
    const target = transactions.find((item) => item.id === id);

    if (!target) return;

    setTransactions((prev) => prev.filter((item) => item.id !== id));

    if (target.type === 'income') {
      setBalance((prev) => prev - target.amount);
    } else {
      setSpent((prev) => prev - target.amount);
      setBalance((prev) => prev + target.amount);
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
              styles={styles}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="TransactionInput" options={{ title: '내역 입력' }}>
          {(props) => (
            <TransactionInputScreen
              {...props}
              addTransaction={addTransaction}
              deleteTransaction={deleteTransaction}
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
          {(props) => <SettingsScreen {...props} styles={styles} />}
        </Stack.Screen>

        <Stack.Screen name="CategoryManage" options={{ title: '카테고리 관리' }}>
          {(props) => (
            <CategoryManageScreen
              {...props}
              categories={categories}
              addCategory={addCategory}
              removeCategory={removeCategory}
              styles={styles}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Notification"
          options={{ title: '알림 설정' }}
          >
        {(props) => (
          <NotificationScreen
            {...props}
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
          {(props) => (
            <HistoryScreen
              {...props}
              transactions={transactions}
              deleteTransaction={deleteTransaction}
              styles={styles}
            />
          )}
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

  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  settingButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E8F2',
    backgroundColor: '#FFFFFF',
  },

  settingIcon: {
    fontSize: 50,
    color: '#444',
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
    marginVertical: 22,
  },

  mediumMoney: {
    fontSize: 26,
    fontWeight: '900',
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: '900',
    marginBottom: 20,
  },

  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },

  smallAlertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 7,
    borderWidth: 1,
    borderColor: '#E5E8F2',
  },

  alertTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  smallAlertTitle: {
    fontSize: 18,
    fontWeight: '900',
    flex: 1,
  },

  smallAlertText: {
    color: '#666',
    marginTop: 8,
    marginBottom: 14,
  },

  detailLink: {
    color: '#1F4F91',
    fontWeight: '900',
    fontSize: 14,
  },

  smallProgressBackground: {
    height: 8,
    backgroundColor: '#E6EAF2',
    borderRadius: 999,
    overflow: 'hidden',
  },

  smallProgressFill: {
    height: '100%',
    borderRadius: 999,
  },

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

  progressText: {
    color: '#666',
    fontWeight: '800',
    marginTop: 8,
    fontSize: 13,
  },

  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E8F2',
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
    marginBottom: 28,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },

  typeRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    marginRight: 8,
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

  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
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

  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
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

  moreButton: {
    fontSize: 24,
    marginLeft: 12,
    color: '#777',
    fontWeight: '900',
  },

  deleteMenu: {
    position: 'absolute',
    top: 32,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E8F2',
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  deleteMenuText: {
    color: '#D13B3B',
    fontWeight: '900',
    fontSize: 14,
  },

  subButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  subButtonText: {
    color: '#1F4F91',
    fontWeight: '900',
    fontSize: 16,
  },

  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },

  filterChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
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

  changeButtonText: {
    color: 'white',
    fontWeight: '900',
  },

  settingMenuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E8F2',
    overflow: 'hidden',
  },

  settingMenuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F5',
  },

  settingMenuText: {
    fontSize: 17,
    fontWeight: '800',
  },

  settingArrow: {
    fontSize: 24,
    color: '#999',
  },

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

  notificationRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  paddingHorizontal: 22,
  paddingVertical: 22,

  borderBottomWidth: 1,
  borderBottomColor: '#EEF0F5',
},

notificationText: {
  fontSize: 17,
  fontWeight: '800',
},

toggle: {
  width: 52,
  height: 30,

  borderRadius: 999,

  backgroundColor: '#D9DDE8',

  justifyContent: 'center',

  paddingHorizontal: 4,
},

toggleActive: {
  backgroundColor: '#5B7BEF',
},

toggleCircle: {
  width: 22,
  height: 22,

  borderRadius: 11,

  backgroundColor: '#FFFFFF',
},

toggleCircleActive: {
  alignSelf: 'flex-end',
},
});
