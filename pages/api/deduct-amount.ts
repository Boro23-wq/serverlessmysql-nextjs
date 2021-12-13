import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

// const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { sender, balanceOfSenderAfterDeduct } = req.body

  try {
    const results = await query(
      `
      UPDATE USER_ACCOUNT
      SET Balance = ?
      WHERE PhoneNo = ?
      `,
      [balanceOfSenderAfterDeduct, sender]
    )

    console.log(res.json(results))

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
