import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { borrowerSSN, borrowedAmount, rtid, memo, tt } = req.body

  try {
    const results = await query(
        `
        INSERT INTO REQUEST_TRANSACTION
        (RTid, Amount, TransactionTime, Memo, UserSSN)
        VALUES (?, ?, ?, ?, ?)
        `,
      [rtid, borrowedAmount, tt, memo, borrowerSSN]
    )

    console.log(res.json(results))

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
