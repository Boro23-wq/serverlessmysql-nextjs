import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { phone } = req.query
  try {
    if (!phone) {
      return res.status(400).json({ message: '`Phone` required' })
    }

    const results = await query(
      `
      SELECT *
      FROM USER_ACCOUNT
      WHERE PhoneNo = ?
    `,
      phone
    )

    console.log(res.json(results[0]))
    return res.json(results[0])
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
