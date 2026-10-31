import jwt from 'jsonwebtoken'
import { AUTH_TIMER } from '../controllers/libs/config'
import Errors, { HttpCode, Message } from '../controllers/libs/Errors'
import { Member } from "../controllers/libs/types/member"

class AuthService {
	private readonly secretToken: string
	constructor() {
		this.secretToken = process.env.SECRET_TOKEN as string
	}

	/**
	 * createToken
	 */
	public async createToken(payload: Member) {
		return new Promise((resolve, reject) => {
			const duration = `${AUTH_TIMER}h`
			jwt.sign(
				payload,
				process.env.SECRET_TOKEN as string,
				{
					expiresIn: duration,
				},
				(err, token) => {
					if (err) {
						reject(
							new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED),
						)
					} else resolve(token as string)
				},
			)
		})
	}
	public async chechAuth(token: string): Promise<Member> {
		const result: Member = (await jwt.verify(token, this.secretToken)) as Member
		console.log('====================================')
		console.log(`--- [AUTH] memberNick: ${result.memberNick}`)
		console.log('====================================')
		return result
	}
}

export default AuthService