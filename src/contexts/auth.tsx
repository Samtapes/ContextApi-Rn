/* eslint-disable prettier/prettier */

import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';


interface User {
  name: string,
  email: string
}


interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(){
      const storagedUser = await AsyncStorage.getItem('@RnAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RnAuth:token');

      if (storagedUser && storagedToken){
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }

      else {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(){
    const response = await auth.signIn();

    setUser(response.user);

    await AsyncStorage.setItem('@RnAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RnAuth:token', response.token);

  }


  async function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }


  return (
    <AuthContext.Provider value={{signed: !!user, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
