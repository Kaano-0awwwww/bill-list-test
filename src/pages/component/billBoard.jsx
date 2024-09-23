import classNames from 'classnames'
import './billBoard.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/lang/billData'
import Icon from './bill_icon.jsx'

const BillBoard = ({ days, billList }) => {

  // console.log(billList);

  const daysResult = useMemo(() => {
    const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
       pay,
       income,
       total: pay + income
    }
  }, [billList])

  // 账单明细 
  const [visible, setVisible] = useState(false)

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{ days }</span>
          <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{ daysResult.pay }</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{ daysResult.income }</span>
          </div>
          <div className="balance">
            <span className="money">{ daysResult.total }</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={ { display: visible ? 'block' : 'none' } }>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default BillBoard