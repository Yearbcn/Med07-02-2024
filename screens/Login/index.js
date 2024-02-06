import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Checkbox from '@react-native-community/checkbox';
import Button from '../../src/components/Button';
import {ToastMessage} from '../../src/constants/methods';
import {
  getData,
  onFacebookButtonPress,
  signIn,
  signInWithGoogle,
} from '../../src/services/firebase';
import COLORS from '../../src/constants/colors';
import {width} from '../../src/constants/dimentions';

function LoginScreen({navigation}) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginMethod = async () => {
    setIsLoading(true);
    if (!email || !password) {
      ToastMessage('Si us plau, ompliu tots els camps');
      setIsLoading(false);
      return;
    }

    const signedIN = await signIn(email, password);
    console.log(signedIN, '-=-=-=');
    if (signedIN.user) {
      const res = await getData('Users', signedIN?.user);
      console.log('====================================');
      console.log(res);
      console.log('====================================');
      navigation.navigate('Main');
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  
  const loginWithGoogle = async () => {
    try {
      const signedIN = await signInWithGoogle();
      console.log(signedIN, '-=-=-=');
      if (signedIN?.user) {
        await getData('Users', signedIN?.user);
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle error, show message, etc.
    }
  };

  const loginWithFacebook = async () => {
    const signedIN = await onFacebookButtonPress();
    console.log(signedIN, '-=-=-=');
    if (signedIN?.user) {
      navigation.navigate('Main');
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
            Inicia sessió
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}>
            Ens alegrem de tornar-te a veure 👋
          </Text>
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
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%',
              }}
              value={password}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={loginMethod}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {isPasswordShown == false ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
            alignItems: 'center',
          }}>
          <Checkbox
            style={{marginRight: width(3), width: width(5), height: width(5)}}
            onValueChange={setIsChecked}
            value={isChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Recorda'm</Text>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Pressable onPress={() => navigation.navigate('ResetPassword')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Restablir la contrasenya
            </Text>
          </Pressable>
        </View>

        <Button
          title="Inicia sessió"
          filled
          isLoading={isLoading}
          onPress={loginMethod}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
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
          <Text style={{fontSize: 14}}>O inicia sessió amb</Text>
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



          {/*<TouchableOpacity*/}
          {/*  onPress={() => console.log('Pressed')}*/}
          {/*  style={{*/}
          {/*    flex: 1,*/}
          {/*    alignItems: 'center',*/}
          {/*    justifyContent: 'center',*/}
          {/*    flexDirection: 'row',*/}
          {/*    height: 52,*/}
          {/*    borderWidth: 1,*/}
          {/*    borderColor: COLORS.grey,*/}
          {/*    marginRight: 4,*/}
          {/*    borderRadius: 10,*/}
          {/*  }}>*/}
          {/*  <Image*/}
          {/*    source={require('../../src/images/apple.png')}*/}
          {/*    style={{*/}
          {/*      height: 50,*/}
          {/*      width: 50,*/}
          {/*      marginRight: 8,*/}
          {/*    }}*/}
          {/*    resizeMode="contain"*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}

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
            No tens compte
          </Text>
          <Pressable onPress={() => navigation.navigate('SignupScreen')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Crea compte
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
