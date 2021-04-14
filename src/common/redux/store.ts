import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as dataReducer } from "./data-reducer";
import { loginReducer } from "./login-reducer";
import { settingsReducer } from "./settingReducer";
import { signupReducer } from "./signup-reducer";

const reducers = {
  form: formReducer,
  data: dataReducer,
  setting: settingsReducer,
  login: loginReducer,
  signup: signupReducer,
};

const reducer = combineReducers(reducers);

export { reducer };
