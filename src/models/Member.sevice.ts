import Membermodel from "../schema/Member.model"
import { Member, MemberInput } from "../controllers/libs/types/member";
import Errors,{HttpCode, Message } from "../controllers/libs/Errors";
import { MemberType } from "../controllers/libs/enums/member.enum";

class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = Membermodel;
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel
            .findOne({ memberType: MemberType.RESTAURANT })
            .exec();
        if (exist)  throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result.toObject() as Member;
        }   catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }
}

export default MemberService;