import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { Auth } from "aws-amplify";

function RegisterScreen({ route, navigation }) {
  const [error, setError] = useState();
  const auth = useAuth();

  var causesOut = "";
  var actionsOut = "";
  for (var i = 0; i < route.params.causes.length; i++) {
    causesOut = causesOut.concat(route.params.causes[i].cause);
    causesOut = causesOut.concat(",");
  }

  actionsOut = actionsOut.concat(
    "donate:",
    route.params.actions.donateValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "march:",
    route.params.actions.marchValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "phone:",
    route.params.actions.phoneValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "share:",
    route.params.actions.shareValue.toString(),
    ","
  );
  actionsOut = actionsOut.concat(
    "write:",
    route.params.actions.writeValue.toString(),
    ","
  );

  const handleSubmit = async (userInfo) => {
    try {
      const result = await Auth.signUp({
        username: userInfo.username,
        password: userInfo.password,
        attributes: {
          email: userInfo.email,
          "custom:causes": causesOut,
          "custom:actions": actionsOut,
        },
      });
      const loginresult = await Auth.signIn(
        userInfo.username,
        userInfo.password
      );
      Auth.currentSession().then((data) => {
        auth.logIn(data.accessToken.jwtToken);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Screen style={styles.container}>
        <AuthForm
          fields={["username", "email", "password", "passwordConfirmation"]}
          onSubmit={handleSubmit}
          submitTitle={"Register"}
          error={error}
        ></AuthForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
