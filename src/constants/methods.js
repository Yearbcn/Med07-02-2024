import Toast from 'react-native-simple-toast';

export const ToastMessage = msg => {
  Toast.show(msg, Toast.LONG);
};
