import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { STid, Amount, TransactionTime, Memo, CancelReason, Identifier, UserSSN } = req.body

  try {
    if (!STid || !Amount || !TransactionTime || !Identifier || !UserSSN) {
      return res
        .status(400)
        .json({ message: '`STid`, `Amount`, `TransactionTime`, `Identifier` and `SSN` are required!' })
    }

  // INSERT INTO SEND_TRANSACTION (STid, Amount, Date/Time, Memo, Cancel_Reason, Identifier, SSN)
  // VALUES (ST21, 11.02, 24-Sep-2019 06:50, Payment for Laptop, Opps! Insufficient balance, Ident031, 123456808);

    const results = await query(
      `
      INSERT INTO SEND_TRANSACTION
      (STid, Amount, TransactionTime, Memo, Cancel_Reason, Identifier, UserSSN)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [STid, Amount, TransactionTime, Memo, CancelReason, Identifier, UserSSN]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
