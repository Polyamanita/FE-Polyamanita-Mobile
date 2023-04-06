import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { doSignOut } from "api/requests";
import { Dispatch } from "redux";
import { queueRefetch, storeCaptures } from "redux/actions/journal-actions";

export const handleSignout = (
  navigation: StackNavigationProp<ParamListBase, string>,
  dispatch: Dispatch,
) => {
  doSignOut().then(() => {
    dispatch(queueRefetch());
    dispatch(storeCaptures({}));
    navigation.popToTop();
  });
};
