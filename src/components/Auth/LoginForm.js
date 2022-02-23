import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput , Button } from "react-native-paper";
import { useFormik} from "formik";
import * as Yup from "yup";
import Toast  from "react-native-root-toast";
import useAuth  from "../../hooks/useAuth";
import { loginApi } from "../../api/user";
import { formStyle } from "../../styles";

export default function LoginForm(props) {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
          setLoading(true);
            try {
              const response = await loginApi(formData);
              if( response.statusCode) throw "Error de Usuario o Contraseña";
              login(response);
            } catch (error) {
              Toast.show(error ,{
              position: Toast.positions.CENTER,
              });
               setLoading(false);
           }
        },
    });

    return (
      <View>
        <TextInput 
        label="Email o usuario" 
        style={formStyle.input}
        onChangeText={(text)=>formik.setFieldValue("identifier",text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
        >
        </TextInput>
        <TextInput 
        label="Contraseña" 
        style={formStyle.input}
        onChangeText={(text)=>formik.setFieldValue("password",text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
        >
        </TextInput>
        <Button 
        mode="contained" 
        style={formStyle.btnSuccess}
        onPress= {formik.handleSubmit}
        loading={loading}
        >
        Entrar</Button>
        <Button mode="text" 
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
        >
        Registrase</Button>
      </View>
    )
  }

  function initialValues(){
      return{
          identifier:"",
          password:""
      }
  }

  function validationSchema(){
      return{
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
      }
  }