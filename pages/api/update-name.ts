import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { name, ssn } = req.body

  try {
    if (!name) {
      return res
        .status(400)
        .json({ message: '`Name` required!' })
    }

    const results = await query(
      `
      UPDATE USER_ACCOUNT
      SET Name = ?
      WHERE SSN = ?
      `,
      [name, ssn]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
