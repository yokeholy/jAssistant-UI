import { createStore } from "redux";
import JDataReducer from "../reducers/JDataReducer";

let jData = createStore(JDataReducer);

export default jData;
