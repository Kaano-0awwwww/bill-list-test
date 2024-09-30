import { NavBar, DatePicker } from 'antd-mobile'
import './Month.scss'
import { useMemo, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import BillBoard from '../component/billBoard'

const Month = () => {
  const [dateVisible, setDateVisible] = useState(false)

  // billList
  const billList = useSelector(state => state.billStore.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  useEffect(() => {
    const list = monthGroup[dayjs().format('YYYY-MM')]
    if(list){
      setCurrentMonthList(list)
    }
  }, [monthGroup])
  
  const [selectedDate, setSelectedDate] = useState(() => dayjs().format('YYYY-MM'))
  const [currentMonthList, setCurrentMonthList] = useState([])
  const confirmDate = (date) => {
    setDateVisible(false)
    const formatDate = dayjs(date).format('YYYY-MM')
    setSelectedDate(formatDate)
    setCurrentMonthList(monthGroup[formatDate] ?? [])
  }

  const monthResult = useMemo(() => {
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
       pay,
       income,
       total: pay + income
    }
  }, [currentMonthList])

  // billBoard
  const dayGroup = useMemo(() => {
    const group = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
    return {
      group,
      days: Object.keys(group)
    }
  }, [currentMonthList])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={ () => setDateVisible(true) }>
            <span className="text">
              { selectedDate }账单
            </span>
            <span className='arrow expand'></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{ monthResult.pay?.toFixed(2) }</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{ monthResult.income?.toFixed(2) }</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{ monthResult.total?.toFixed(2) }</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={ dateVisible }
            max={new Date()}
            onClose={ () => setDateVisible(false) }
            onConfirm={ confirmDate }
          />
        </div>
          { dayGroup.days.map(item => (<BillBoard key={ item } days={ item } billList={ dayGroup.group[item] } />)) }
      </div>
    </div >
    
  )
}

export default Month