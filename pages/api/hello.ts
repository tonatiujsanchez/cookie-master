// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { 'master-theme-cookie': theme='light', name='No name' } = req.cookies


  console.log( '/api/hello', {theme, name});
  

  res.status(200).json({
    name: 'John Doe',
    ...req.cookies
  })
}
