import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { rtid, requestor } = req.body

  try {
    const results = await query(
        `
        INSERT INTO REQUESTS_FROM
        (RTid, Identifier)
        VALUES (?, ?)
        `,
      [rtid, requestor]
    )

    console.log(res.json(results))

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
