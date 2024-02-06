import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../src/constants/colors';
import Button from '../../src/components/Button';
import {resetEmailRequest} from '../../src/services/firebase';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  ResetPassword.navigationOptions = {
    headerTitle: null, // Configura el título como null para eliminar el texto
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const res = await resetEmailRequest(email); // Send the reset password email
      if (res) {
        Alert.alert(
          'Correu electrònic enviat',
          'Revisa el teu correu electrònic.',
        );
        setLoading(false);
        navigation.navigate('LoginScreen'); // Navigate to the login screen
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Aquest correu electrònic no estat registrat', error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.container}>
        <Text style={styles.title}>Restablir Contrasenya</Text>
        <Text style={styles.description}>
         Introdueix el teu correu electrònic i rebràs instruccions 
         per restablir la contrasenya.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
          />
        </View>

        <Button
          title="Continuar"
          filled
          isLoading={loading}
          onPress={handleResetPassword}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    marginTop: 20,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
  },
});

export default ResetPassword;
