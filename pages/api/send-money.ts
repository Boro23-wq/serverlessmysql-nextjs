import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

// const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { phoneNo, roundedBalance } = req.body

  try {
    if (!phoneNo || !roundedBalance) {
      return res
        .status(400)
        .json({ message: '`Phone` and `amount` are both required!' })
    }

    const results = await query(
      `
      UPDATE USER_ACCOUNT
      SET Balance = ?
      WHERE PhoneNo = ?
      `,
      [roundedBalance, phoneNo]
    )

    console.log(res.json(results))

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
