import { createUser, getUserByEmail } from 'db/users'
import express, { Request, Response } from 'express'
import { authentication, random } from 'helpers'

/**
 * Registers a new user.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns The registered user as a JSON object.
 * @throws 400 - If the request body is missing any of the required fields or user already exists.
 * @example 
 * //User data from request
 * {
 *   "email": "joao@gmail.com",
 *   "password": "123456",
 *   "username": "joao123"
 * }
 * //User data on response
 * {}
 * 
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username}  = req.body

    if(!email || !password || !username) return res.sendStatus(400)

    const existingUser = await getUserByEmail(email)

    if(existingUser) return res.sendStatus(400)

    const salt = random()
    const user = await createUser({
      email, 
      username,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    })

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}