import Membermodel from "../schema/Member.model"
import { LoginInput, Member, MemberInput } from "../controllers/libs/types/member";
import Errors,{HttpCode, Message } from "../controllers/libs/Errors";
import { MemberType } from "../controllers/libs/enums/member.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = Membermodel;
    }

    

    public async signup(input:MemberInput): Promise<Member> {
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);        

        try{
           const result = await this.memberModel.create(input);
        result.memberPassword = "";
            return result.toJSON() as unknown as Member;
     }catch(err){
        console.log("Error in signup",err);
        throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
     }
    }

     public async login(input:LoginInput): Promise<Member> {
        //TODO : consider memberStatus and memberType in login
        const member = await this.memberModel
            .findOne(
                {memberNick:input.memberNick},
                {memberNick:1,memberPassword:1}
            )
            .exec();

        if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);   
        if (!isMatch){ 
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }

        const foundMember = await this.memberModel.findById(member._id).lean().exec();
        if (!foundMember) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        }

        return foundMember as unknown as Member;
     }


    /*SSR */


    public async proccesSignup(input:MemberInput): Promise<Member> {
        const exist = await this.memberModel
            .findOne({memberType: MemberType.RESTAURANT})
            .exec();
            console.log("already restuarant exists")
        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try{
           const result = await this.memberModel.create(input);
        result.memberPassword = "";
         return result.toJSON() as Member;
     }catch{
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
     }
    }

     public async proccesLogin(input:LoginInput): Promise<Member> {
        const member = await this.memberModel
            .findOne(
                {memberNick:input.memberNick},
                {memberNick:1,memberPassword:1}
            )
            .exec();

        if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        const isMatch = await bcrypt.compare(input.memberPassword, member.memberPassword);   
        // const isMatch = member.memberPassword === input.memberPassword;
        if (!isMatch) 
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        
        const foundMember = await this.memberModel.findById(member._id).lean().exec();
        if (!foundMember) {
            throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
        }

        return foundMember as unknown as Member;


     }

    }

export default MemberService;