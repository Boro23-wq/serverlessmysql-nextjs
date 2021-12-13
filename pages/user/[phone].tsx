import { useState } from 'react'
import { useRouter } from 'next/router'
import Container from '@/components/container'
import Nav from '@/components/nav'
import { useUser } from '@/lib/swr-hooks'
import { generateRandomId } from 'utils/generateId'
import { generateDateTime } from 'utils/generateDateTime'

export default function ProfilePage() {
  const router = useRouter()
  const phone = router.query.phone?.toString()
  const { user } = useUser(phone)

  // const [phoneNo, setPhoneNo] = useState('9964829314')
  // const [amount, setAmount] = useState(12211221.00)
  const [phoneNo, setPhoneNo] = useState('')
  const [amount, setAmount] = useState(0)
  const [memo, setMemo] = useState('')
  const [requestMemo, setRequestMemo] = useState('')

  const [borrowerPhoneNo, setBorrowerPhoneNo] = useState('')
  const [borrowedAmount, setBorrowedAmount] = useState(0)

  const { user: recipient } = useUser(phoneNo)

  const { user: borrower } = useUser(borrowerPhoneNo)

  // SEND MONEY
  const sendMoneyHandleClick = async () => {
    const balanceOfSender = user.Balance
    const balanceOfSenderAfterDeduct = Number(balanceOfSender) - Number(amount)

    const balance = recipient?.Balance // number
    const updatedBalance = Number(balance) + Number(amount)
    const roundedBalance = Math.round(updatedBalance * 100) / 100

    try {
      const res = await fetch('/api/send-money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNo,
          roundedBalance,
          // balanceOfSenderAfterDeduct,
          // sender: user?.PhoneNo
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)

      // transaction successful

      const deductAmtRes = await fetch('/api/deduct-amount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: user.PhoneNo,
          balanceOfSenderAfterDeduct
        }),
      })

      const deductAmtResJson = await deductAmtRes.json()
      console.log(deductAmtResJson)

      const successRes = await fetch('/api/record-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          STid: generateRandomId(15),
          Amount: amount,
          TransactionTime: generateDateTime(),
          Memo: memo ? memo : 'Payment Successful',
          CancelReason: '',
          Identifier: user.PhoneNo,
          UserSSN: recipient.SSN
        }),
      })

      const successResJson = await successRes.json();
      console.log(successResJson)
    } catch (e) {
      throw Error(e.message)
    }
  }

  // REQUEST MONEY
  const requestMoneyHandleClick = async () => {

    const rtid = generateRandomId(15)

    // const borrower
    try {
      const res = await fetch('/api/request-money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rtid,
          borrowedAmount,
          tt: generateDateTime(),
          memo: requestMemo ? requestMemo : 'Requested!',
          borrowerSSN: borrower.SSN,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)

      // REQUEST MONEY SUCCESSFULL
      const requestFromRes = await fetch('/api/request-from', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rtid,
          requestor: user?.PhoneNo
        }),
      })

      const requestFromJson = await requestFromRes.json()
      if (!requestFromJson.ok) throw Error(json.message)

    } catch (e) {
      throw Error(e.message)
    }
  }

  if (user) {
    return (
      <>
        <Container className="py-4">
          <Nav title="Payment Wallet" user={user} />
          <div>Welcome <b><i>{user.Name}</i></b></div>

          {/* SEND MONEY */}
          <div>
            <form className="w-full max-w-xl mt-10">
              <div className="flex items-center border-b border-black-500 py-2 px-2 ">
                <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-5 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Phone" />
                <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Amount" />
                <input value={memo} onChange={(e) => setMemo(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Memo" />
                <button onClick={sendMoneyHandleClick} className="flex-shrink-0 bg-gray-700 hover:bg-gray-800 border-gray-700 hover:border-gray-800 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                  Send Money
                </button>
              </div>
            </form>
          </div>

          {/* REQUEST MONEY */}
          <div>
            <form className="w-full max-w-xl mt-10">
              <div className="flex items-center border-b border-black-500 py-2 px-2 ">
                <input value={borrowerPhoneNo} onChange={(e) => setBorrowerPhoneNo(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-5 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Phone" />
                <input value={borrowedAmount} onChange={(e) => setBorrowedAmount(Number(e.target.value))} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Amount" />
                <input value={requestMemo} onChange={(e) => setRequestMemo(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Memo" />
                <button onClick={requestMoneyHandleClick} className="flex-shrink-0 bg-gray-700 hover:bg-gray-800 border-gray-700 hover:border-gray-800 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                  Request Money
                </button>
              </div>
            </form>
          </div>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }
}
