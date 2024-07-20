import { configureStore } from "@reduxjs/toolkit"
import billReducer from "./modules/billStore"

const store = configureStore({
  reducer: {
    billStore: billReducer
  }
})

export default store