import { Permissions, Notifications } from 'expo';

export default async function getExpoToken() {
  const permissions = await Promise.all(
    [ Permissions.NOTIFICATIONS, Permissions.USER_FACING_NOTIFICATIONS ].map(async (permission) => {
      const { status: existingStatus } = await Permissions.getAsync(permission);
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(permission);
        finalStatus = status;
      }

      return (finalStatus);
    })
  );
  if (permissions.every((permission) => permission === 'granted')) {
    const response = await Expo.Notifications.getExpoPushTokenAsync();

    return (response);
  }
  return (null);
}
