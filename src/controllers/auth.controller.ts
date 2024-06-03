import { Request, Response } from 'express'

export const signin = (_req: Request, res: Response): void => {
  res.send('Signin')
}
