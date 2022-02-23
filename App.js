import React  { useState , useEffect, useMemo } from "react";
import { Text } from "react-native";
import {  Provider as PaperProvider } from "react-native-paper";
import jwtDecode  from "jwt-decode";
import AuthScreen from "./src/screens/Auth"; /*Importo el Auth */ 
import AuthContext from "./src/context/AuthContex";
import { setTokenApi, getTokenApi } from "./src/api/token";




export default function App() {
  /* creo una constante de useState para ver si el usuario esta logeado*/
  const [auth, setAuth] = useState(undefined); 

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  function login(user) {
  setTokenApi(user.jwt);
  setAuth({
    token: user.jwt,
    idUser: user.user._id,
  });
};

  const authData = useMemo(
    () =>({
      auth,
      login,
      logout: () => null,
    }),
    [auth] 
  );

  if ( auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
     <PaperProvider>
      {auth ? <Text>Zona de Usuarios</Text> : <AuthScreen/>}
     </PaperProvider>
    </AuthContext.Provider>
  );
}


