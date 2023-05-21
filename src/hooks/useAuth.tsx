import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { makeRedirectUri, revokeAsync, startAsync } from 'expo-auth-session';
import { generateRandom } from 'expo-auth-session/build/PKCE';

import { env } from '../env';
import { api } from '../services/api';

interface User {
  id: number;
  display_name: string;
  email: string;
  profile_image_url: string;
}

interface AuthContextData {
  user: User;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthProvider({children}: AuthContextProviderProps) {
  const [user, setUser] = useState({} as User);
  const [userToken, setUserToken] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function signIn() {
    try {
      setIsLoggingIn(true);

      const { CLIENT_ID, TWITCH_ENDPOINT_AUTHORIZATION } = env;

      const REDIRECT_URI = makeRedirectUri({ useProxy: true });
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('openid user:read:email user:read:follows');
      const FORCE_VERIFY = true;
      const STATE = generateRandom(30);

      const authUrl = TWITCH_ENDPOINT_AUTHORIZATION
        .concat(`?client_id=${CLIENT_ID}`)
        .concat(`&redirect_uri=${REDIRECT_URI}`)
        .concat(`&response_type=${RESPONSE_TYPE}`)
        .concat(`&scope=${SCOPE}`)
        .concat(`&force_verify=${FORCE_VERIFY}`)
        .concat(`&state=${STATE}`);

      const authResponse = await startAsync({ authUrl });

      if(authResponse.type === 'success' && authResponse.params.error !== 'access_denied'){
        if(authResponse.params.state !== STATE) 
          throw new Error('Invalid state value');
        
        api.defaults.headers.common['Authorization'] = `Bearer ${authResponse.params.access_token}`;

        const userResponse = await api.get('/users') as User;

        setUser({
          id: userResponse.id,
          display_name: userResponse.display_name,
          email: userResponse.email,
          profile_image_url: userResponse.profile_image_url
        });

        setUserToken(authResponse.params.access_token);
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      setIsLoggingIn(false);
    }
  };

  async function signOut() {
    try {
      setIsLoggingOut(true);

      const { CLIENT_ID, TWITCH_ENDPOINT_REVOCATION } = env;

      revokeAsync({
        token: userToken,
        clientId: CLIENT_ID,
      },{
        revocationEndpoint: TWITCH_ENDPOINT_REVOCATION
      })
    } catch (error) {
      console.log(error);
    } finally {
      setUser({} as User);
      setUserToken('');
      delete api.defaults.headers.common['Authorization'];
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const { CLIENT_ID } = env;
    api.defaults.headers.common['Client-Id'] = CLIENT_ID;
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggingIn,
      isLoggingOut,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };