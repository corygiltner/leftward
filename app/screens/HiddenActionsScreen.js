import React, { useEffect, useState } from "react";
import { StyleSheet, Text} from "react-native";

import colors from "../config/colors";

import Screen from "../components/Screen";
import ActionList from "../components/ActionList"
import fetchHiddenActions from "../data/fetchHiddenActions"
import useAuth from "../auth/useAuth";
import logAmplitudeEventOnMount from "../utility/logAmplitudeEventOnMount"



function HiddenActionsScreen({ navigation }) {
  logAmplitudeEventOnMount('ViewHiddenActions')

  const [actions, setActions] = useState([]);
  const { user, logOut } = useAuth();

  useEffect(() => {
    fetchHiddenActions(setActions, user.attributes["custom:GQLuserID"]);
  }, []);
  
  return (
      <Screen >
        <ActionList
          itemList={actions}
          navigation={navigation}
          doOnRefresh={() => fetchHiddenActions(setActions, user.attributes["custom:GQLuserID"])}/>
      </Screen>
  );
}

const styles = StyleSheet.create({

});

export default HiddenActionsScreen;
