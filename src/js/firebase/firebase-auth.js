import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import Notiflix from 'notiflix';
import { refs } from '../refs/refs';

const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();

if (document.title === 'Home') {
  // Notiflix.Loading.pulse();
  checkUserLog();
  refs.signUpBtn.addEventListener('click', showSignUpModal);
  refs.formRegister.addEventListener('submit', registerUser);
  refs.buttonLogout.addEventListener('click', handleSignOut);
  refs.formLogin.addEventListener('submit', handleLogIn);
  refs.buttonLoginWithGoogle.addEventListener('click', loginWithGoogle);
  // Notiflix.Loading.remove();
  return;
} else {
  return;
}

function registerUser(e) {
  e.preventDefault();
  const {
    target: { email, password },
    currentTarget,
  } = e;

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(cred => {
      console.log('user created', cred.user);
      Notiflix.Notify.success(`user created ${cred.user}`);
      currentTarget.reset();
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      console.log(error.message);
    });
}

function handleSignOut(e) {
  signOut(auth)
    .then(() => {
      // console.log('user signed out');
      refs.signUpBtn.textContent = 'Sign up';
      Notiflix.Notify.success('user signed out');
      closeModalOnBtnRegister();
      location.reload();
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      console.log(error.message);
    });
}

function handleLogIn(e) {
  e.preventDefault();

  const {
    target: { email, password },
    currentTarget,
  } = e;

  if (email.value.length === 0) {
    Notiflix.Notify.warning('Please enter your e-mail');
    return;
  }
  if (password.value.length === 0) {
    Notiflix.Notify.warning('Please enter password');
    return;
  } else {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(cred => {
        // console.log('user logged in', cred.user);
        currentTarget.reset();
        Notiflix.Notify.success(`Hello ${cred.user.email}!`);
        refs.headerNav.querySelector(
          '[data-value="libraryRef"]'
        ).style.display = '';
        refs.buttonLogout.style.display = '';
        closeModalOnBtnRegister();
        // location.reload();
      })
      .catch(error => {
        Notiflix.Notify.failure(`user ${email.value} is not found`);
        console.log(error.message);
      });
  }
}

function loginWithGoogle(e) {
  signInWithRedirect(auth, providerGoogle);

  // signInWithPopup(auth, providerGoogle);
  // .then(result => {
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   console.log(credential);
  //   const user = result.user;
  //   console.log(user);
  // })
  // .catch(error => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   Notiflix.Notify.failure(`${credential}`);
  // });
}

function showSignUpModal(e) {
  e.preventDefault();
  refs.buttonCloseRegister.addEventListener('click', closeModalOnBtnRegister);
  refs.backdropRegister.addEventListener(
    'click',
    closeModalOnBackdropClickRegister
  );

  refs.backdropRegister.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeModalOnBtnRegister(e) {
  refs.backdropRegister.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');

  refs.buttonCloseRegister.removeEventListener(
    'click',
    closeModalOnBtnRegister
  );
  refs.backdropRegister.removeEventListener('click', closeModalOnBtnRegister);

  window.removeEventListener('keydown', closeModalOnBackdropClickRegister);
}

function closeModalOnBackdropClickRegister(e) {
  const { target, currentTarget, code } = e;
  if (target === currentTarget) {
    refs.backdropRegister.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }
  if (code === 'Escape') {
    refs.backdropRegister.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }

  window.removeEventListener('keydown', closeModalOnBackdropClickRegister);
}

function checkUserLog() {
  // Notiflix.Loading.pulse();
  return onAuthStateChanged(auth, user => {
    if (user) {
      refs.signUpBtn.textContent = user.displayName || user.email;
      refs.formLogin.style.display = 'none';
      refs.formRegister.style.display = 'none';
      refs.headerNav
        .querySelector('[data-value="libraryRef"]')
        .parentElement.classList.remove('visually-hidden');
      // Notiflix.Loading.remove();
    } else {
      refs.buttonLogout.style.display = 'none';
    }
    // Notiflix.Loading.remove();
  });
}

export { auth };
