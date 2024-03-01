import { FC, ReactNode, createContext, useEffect, useReducer } from 'react';
import { User } from 'src/models/user';
import firebase from 'src/utils/firebase';
import PropTypes from 'prop-types';
import { fetchUserByAuthID } from 'src/services/user.service';

interface AuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  method: 'Firebase';
  createUserWithEmailAndPassword: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string
  ) => Promise<any>;
  // eslint-disable-next-line no-unused-vars
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthStateChangedAction = {
  type: 'AUTH_STATE_CHANGED';
  payload: {
    isAuthenticated: boolean;
  };
};

type Action = AuthStateChangedAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialized: false
};

const reducer = (state: AuthState, action: Action): AuthState => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true
    };
  }

  return state;
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  method: 'Firebase',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userFirebase) => {
      if (userFirebase) {
        fetchUserByAuthID(userFirebase.uid)
          .then((res) => {
            const userBack = res.data.data;
            dispatch({
              type: 'AUTH_STATE_CHANGED',
              payload: {
                isAuthenticated: true
              }
            });
          })
          .catch((err)=>{
            console.error(err);
            dispatch({
              type: 'AUTH_STATE_CHANGED',
              payload: {
                isAuthenticated: true
              }
            });
          });
      } else {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: false
          }
        });
      }
    });
  }, [dispatch]);

  const signInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<any> => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = (): Promise<any> => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<any> => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = (): Promise<void> => {
    return firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'Firebase',
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
