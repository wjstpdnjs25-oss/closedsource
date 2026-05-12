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

function HomeScreen({ navigation, balance, budget, spent, wish }) {
  const formatWon = (num) => `₩ ${num.toLocaleString()}`;
  const overAmount = spent - budget;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
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
            <Text style={styles.alertMain}>
              아직 예산 초과 내역이 없어요
            </Text>
            <Text style={styles.alertSub}>
              지출과 예산을 설정하면 알림이 표시돼요.
            </Text>
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>바로가기</Text>

      <Pressable
        style={styles.menuCard}
        onPress={() => navigation.navigate('Balance')}
      >
        <Text style={styles.menuTitle}>잔액 입력</Text>
      </Pressable>

      <Pressable
        style={styles.menuCard}
        onPress={() => navigation.navigate('Expense')}
      >
        <Text style={styles.menuTitle}>지출 입력</Text>
      </Pressable>

      <Pressable
        style={styles.menuCard}
        onPress={() => navigation.navigate('Budget')}
      >
        <Text style={styles.menuTitle}>예산 설정</Text>
      </Pressable>

      <Pressable
        style={styles.menuCard}
        onPress={() => navigation.navigate('Wish')}
      >
        <Text style={styles.menuTitle}>위시세이브</Text>
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

function InputScreen({ route, navigation }) {
  const { title, onSave } = route.params;
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputCard}>
        <TextInput
          style={styles.input}
          placeholder="금액 입력"
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
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [wish, setWish] = useState(0);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              balance={balance}
              budget={budget}
              spent={spent}
              wish={wish}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Balance">
          {(props) => (
            <InputScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  title: '잔액 입력',
                  onSave: setBalance,
                },
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Expense">
          {(props) => (
            <InputScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  title: '지출 입력',
                  onSave: setSpent,
                },
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Budget">
          {(props) => (
            <InputScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  title: '예산 설정',
                  onSave: setBudget,
                },
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Wish">
          {(props) => (
            <InputScreen
              {...props}
              route={{
                ...props.route,
                params: {
                  title: '위시세이브',
                  onSave: setWish,
                },
              }}
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
    paddingTop: 70,
  },

  content: {
    paddingBottom: 40,
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
});