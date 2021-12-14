import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { startDate, endDate, identifier} = req.body

  try {
    const results = await query(
        `
        SELECT * 
        FROM SEND_TRANSACTION 
        WHERE TransactionTime >= ? 
        AND TransactionTime <= ? 
        `,
      [startDate, endDate]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
