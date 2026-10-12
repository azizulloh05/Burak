import * as bcrypt from 'bcryptjs'
import { shapeIntoMongooseObjectId } from '../controllers/libs/config'
import { MemberType } from '../controllers/libs/enums/member.enum'
import Errors, { HttpCode, Message } from '../controllers/libs/Errors'

import {
	LoginInput,
	Member,
	MemberInput,
	MemberUpdateInput,
} from '../controllers/libs/types/member'
import MemberModel from '../schema/Member.model'

class MemberService {
	private readonly memberModel

	constructor() {
		this.memberModel = MemberModel
	}

	/** SPA */

	public async signup(input: MemberInput): Promise<Member> {
		const salt = await bcrypt.genSalt()
		input.memberPassword = await bcrypt.hash(input.memberPassword, salt)

		try {
			const result = await this.memberModel.create(input)
			result.memberPassword = ''
			return result.toJSON() as Member
		} catch (err) {
			console.log('Error, model:signup:', err)
			throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE)
		}
	}
	public async login(input: LoginInput): Promise<Member> {
		// TODO: Consider member status later
		const member = await this.memberModel
			.findOne(
				{ memberNick: input.memberNick },
				{ memberNick: 1, memberPassword: 1 },
			)
			.exec()
		if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK)

		const isMatch = await bcrypt.compare(
			input.memberPassword,
			member.memberPassword,
		)

		if (!isMatch) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD)
		}

		return (await this.memberModel.findById(member._id).lean().exec()) as Member
	}

	/** SSR */

	// public async processSignup(): Promise<void> {
	// 	console.log('process Signup')
	// }
	public async processSignup(input: MemberInput): Promise<Member> {
		const exist = await this.memberModel
			.findOne({ memberType: MemberType.RESTAURANT })
			.exec()

		console.log('exist:', exist)
		if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)

		console.log('before salt:', input.memberPassword)
		const salt = await bcrypt.genSalt()
		input.memberPassword = await bcrypt.hash(input.memberPassword, salt)
		console.log('after salt:', input.memberPassword)

		try {
			const result = await this.memberModel.create(input)
			result.memberPassword = ''
			return result as Member
		} catch (err) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
		}
	}
	public async processLogin(input: LoginInput): Promise<Member> {
		const member = await this.memberModel
			.findOne(
				{ memberNick: input.memberNick },
				{ memberNick: 1, memberPassword: 1 },
			)
			.exec()
		if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK)

		// const isMatch = input.memberPassword === member.memberPassword
		const isMatch = await bcrypt.compare(
			input.memberPassword,
			member.memberPassword,
		)

		if (!isMatch) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD)
		}

		return (await this.memberModel.findById(member._id).exec()) as Member
	}

	public async getUsers(): Promise<Member[]> {
		const result = await this.memberModel
			.find({ memberType: MemberType.USER })
			.exec()
		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)

		return result as Member[]
	}

	public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
		input._id = shapeIntoMongooseObjectId(input._id)

		const result = await this.memberModel
			.findByIdAndUpdate({ _id: input._id }, input, { new: true })
			.exec()
		if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
// @ts-ignore
		return result;
	}
}

export default MemberService