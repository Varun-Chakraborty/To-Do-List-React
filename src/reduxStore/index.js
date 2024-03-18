import { configureStore } from "@reduxjs/toolkit";
import reducer from '../redux/todoSlice';
export default configureStore({ reducer });