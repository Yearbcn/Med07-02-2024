import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Checkbox from '@react-native-community/checkbox';
import COLORS from '../../src/constants/colors';
import Button from '../../src/components/Button';
import {ToastMessage} from '../../src/constants/methods';
import {
  creatUser,
  onFacebookButtonPress,
  saveData,
  signInWithGoogle,
} from '../../src/services/firebase';
import auth from '@react-native-firebase/auth';
import {width} from '../../src/constants/dimentions';

function SignupScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsChecked(route.params?.isChecked)
    }, [route])

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      ToastMessage('Correu electrònic incorrecte');
      return false;
    } else {
      Validate();
    }
  };
  const Validate = async () => {
    setIsLoading(true);
    if (!name) {
      ToastMessage('Si us plau, ompliu el nom!');
      setIsLoading(false);
      return;
    }
    if (!password) {
      ToastMessage('Ompliu la contrasenya');
      setIsLoading(false);
      return;
    }
    if (password.length <= 5) {
      ToastMessage('La contrasenya ha de tenir 6 caràcters');
      setIsLoading(false);
      return;
    }
    if (!isChecked) {
      ToastMessage('Accepteu les condicions i termes per continuar');
      setIsLoading(false);
      return;
    }
    const res = await creatUser(email, password);
    if (res) {
      const uid = auth().currentUser.uid;
      const result = await saveData('Users', uid, {
        name: name,
        uid: uid,
        email: email,
      });
      if (result) {
        setIsLoading(false);
        ToastMessage('Compte creat amb èxit');
        navigation.navigate('Main');
      } else {
        setIsLoading(false);
        ToastMessage('Hi ha hagut un error.');
      }
    } else {
      setIsLoading(false);
      ToastMessage('Error en crear el compte.');
    }
  };
  const loginWithGoogle = async () => {
    const signedIN = await signInWithGoogle();
    console.log(signedIN, '-=-=-=');
    if (signedIN?.user) {
      const result = await saveData('Users', signedIN?.user?.uid, {
        name: signedIN?.user?.displayName,
        uid: signedIN?.user?.uid,
        email: signedIN?.user?.email,
      });
      if (result) {
        setIsLoading(false);
        ToastMessage('Compte creat amb èxit');
        navigation.navigate('Main');
      }
    }
  };
  const loginWithFacebook = async () => {
    const signedIN = await onFacebookButtonPress();
    console.log(signedIN, '-=-=-=');
    if (signedIN?.user) {
      const result = await saveData('Users', signedIN?.user?.uid, {
        name: signedIN?.user?.displayName,
        uid: signedIN?.user?.uid,
        email: signedIN?.user?.email,
      });
      if (result) {
        setIsLoading(false);
        ToastMessage('Compte creat amb èxit');
        navigation.navigate('Main');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginVertical: 22}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}>
            Registra't
          </Text>
        </View>

        <View style={{marginBottom: 12}}>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Nom d'usuari"
              placeholderTextColor={COLORS.black}
              value={name}
              onChangeText={text => setName(text)}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Correu Electrònic"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text.toLowerCase())}
              style={{
                width: '100%',
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 12, marginTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Contrasenya"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={text => setPassword(text)}
              style={{
                width: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
            alignItems: 'center',
          }}>
          <Checkbox
            style={{marginRight: width(4), width: width(5), height: width(5)}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text
            style={{width: width(80)}}
            onPress={() => navigation.navigate('Privacy', {isChecked: isChecked})}>
            En fer clic a Registre, accepteu els nostres termes, privadesa i
            política i acord d'usuari
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Politica')}>
          <Text style={{color: COLORS.primary}}>Política de privacitat</Text>
        </TouchableOpacity> */}

        <Button
          title="Registra't"
          filled
          //   onPress={signUp}
          onPress={() => validateEmail(email)}
          isLoading={isLoading}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          disabled={!isChecked}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
          <Text style={{fontSize: 14}}>O registra't amb</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => loginWithGoogle()}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}>
            <Image
              source={require('../../src/images/google.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => loginWithFacebook()}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}>
            <Image
              source={require('../../src/images/facebook.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Si tens un compte
          </Text>
          <Pressable onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Inicia sessió
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen;
