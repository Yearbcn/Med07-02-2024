import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ToastMessage} from '../constants/methods';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export async function saveData(collection, doc, jsonObject) {
  let success = false;
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .then(() => {
      success = true;
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
      success = false;
    });
  return success;
}

export const signIn = async (email, password) => {
  let user = '';
  let error = '';
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(users => {
      user = users.user.uid;
    })
    .catch(errors => {
      console.log("LoginError", errors)
      error = errors.message;
      if (
        error ===
        '[auth/wrong-password] The password is invalid or the user does not have a password.'
      ) {
        ToastMessage(
          'Contrasenya invàlida',
        );
      } else if (
        error === '[auth/invalid-email] The email address is badly formatted.'
      ) {
        ToastMessage('Correu electrònic invàlid!');
      } else if (
        error ===
        '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
      ) {
        ToastMessage(
          'Cap compte corresponent a aquest identificador/a',
        );
      } else if(error.includes("[ INVALID_LOGIN_CREDENTIALS ]")){
        ToastMessage("Credencials no vàlides");
      }
      else ToastMessage(error);
    });
  return {user, error};
};

export const signInWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId:
      '964940426884-e18dsdv6f6j6cafgohnoi9lcmkvcln02.apps.googleusercontent.com',
  });
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

export async function onFacebookButtonPress() {
  // Attempt login with permissions
  let ok = false;
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    ToastMessage('Inici de sessió cancel·lat');
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    ToastMessage('Error en iniciar la sessió');
  }

  // Create a Firebase credential with the AccessToken

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

export const creatUser = async (email, password) => {
  let success = true;
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      success = true;
    })

    .catch(error => {
      success = false;
      if (error.code === 'auth/invalid-email') {
        ToastMessage('Correu electrònic invàlid!');
      } else if (error.code === 'auth/user-disabled') {
        ToastMessage('El compte està inhabilitat!');
      } else if (error.code === 'auth/user-not-found') {
        ToastMessage('Usuari no trobat!');
      } else if (error.code === 'auth/wrong-password') {
        ToastMessage('Contrasenya incorrecta!');
      } else if (error.code === 'auth/too-many-requests') {
        ToastMessage(
          'Activitat inusual, si us plau, torna a provar més tard.',
        );
      } else if(error?.message?.includes("[auth/email-already-in-use]")){
        ToastMessage("L'adreça de correu electrònic ja existeix");
      }
       else {
        ToastMessage(error.message);
        console.log("error.message", error.message)
      }
    });
  return success;
};

export async function resetEmailRequest(email) {
  let success = true;
  await auth().setLanguageCode('es');
  await auth()
    .sendPasswordResetEmail(email)
    .catch(function (error) {
      success = false;
      if (error.code === 'auth/user-not-found') {
        ToastMessage(
          'El correu electrònic proporcionat no coincideix amb els nostres registres.',
        );
      } else if (error.code === 'auth/unknown') {
        ToastMessage(
          'Error de connexió',
        );
      } else {
        ToastMessage(error.message);
      }
    });
  return success;
}

export const getData = async (collection, doc) => {
  try {
    const res = await firestore().collection(collection).doc(doc).get();
    if (res.exists)
      return {
        success: true,
        exists: true,
        data: res.data(),
      };
    else return {success: true, exists: false, data: null};
  } catch (error) {
    console.log('error here ' + error);
    return {success: false, message: error?.message};
  }
};
