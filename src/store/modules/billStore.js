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
    addBillList(state, action) {
      state.billList.push(action.payload)
    }
  }
})

const getBillListServer = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(res.data))
  } 
}

const addBillServer = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:8888/ka', data)
    dispatch(addBillList(res.data))
  }
}

export { getBillListServer, addBillServer }
// 创建action对象
const { setBillList, addBillList } = billStore.actions

// 实例化导出reducer
const billReducer = billStore.reducer
export default billReducer