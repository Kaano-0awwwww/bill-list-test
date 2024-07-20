import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const billStore = createSlice({
  name: 'billStore',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    },
  }
})

const getBillListServer = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  } 
}
export { getBillListServer }
// 创建action对象
const { setBillList } = billStore.actions

// 实例化导出reducer
const billReducer = billStore.reducer
export default billReducer