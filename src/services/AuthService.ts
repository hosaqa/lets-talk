import { injectable } from 'inversify';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { firebaseAuth, googleAuthProvider } from './firebase';
import { makeObservable, observable, action, computed } from 'mobx';

export interface IAuthService {
  authStateRestored: boolean;
  userData: {
    email: string;
  } | null;
  isLoggedIn: boolean;
  loginByGoogle: () => Promise<string>;
  logout: () => Promise<void>;
}

@injectable()
export class FirebaseAuthService implements IAuthService {
  authStateRestored = false;
  userData: {
    email: string;
  } | null = null;

  constructor() {
    firebaseAuth.onAuthStateChanged((result) => {
      if (result) {
        this.userData = {
          email: result.email as string,
        };
      }

      this.authStateRestored = true;
    });

    makeObservable(this, {
      authStateRestored: observable,
      userData: observable,
      isLoggedIn: computed,
      loginByGoogle: action,
      logout: action,
    });
  }

  get isLoggedIn() {
    return !!this.userData;
  }

  loginByGoogle = async () => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);
      const result = await signInWithPopup(firebaseAuth, googleAuthProvider);

      this.userData = {
        email: result.user.email as string,
      };

      return result.user.email as string;
    } catch (error) {
      const errorMessage = (error as FirebaseError)?.message || 'Something went wrong';

      throw new Error(errorMessage);
    }
  };

  logout = async () => {
    await firebaseAuth.signOut();
    this.userData = null;
  };
}
