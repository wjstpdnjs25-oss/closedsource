import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  return status === 'granted';
}

export async function sendBudgetNotification(
  category,
  percent
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '예산 알림',
      body: `${category} 예산의 ${percent}%를 사용했어요.`,
    },

    trigger: null,
  });
}