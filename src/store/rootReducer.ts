import { combineReducers } from '@reduxjs/toolkit';
const rootReducer = combineReducers({
  mock: () => {
    return { mock: '' };
  }
});

export default rootReducer;
