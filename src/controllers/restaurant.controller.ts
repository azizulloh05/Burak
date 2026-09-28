import { Request, Response } from "express";
import { T } from "./libs/types/common";
import MemberService from "../models/Member.sevice";
import { MemberType } from "./libs/enums/member.enum";
import { MemberInput } from "./libs/types/member";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
try {
    console.log("Home page");
    res.send(" HomePage"); 
} catch (err) {
    console.log("Error, goHome", err);
}
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("Login page");
        res.send(" Login Page");
    } catch (err) {
        console.log("Error, getLogin", err);
    }
};
    
restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("Signup page");
        res.send(" Signup Page");
    } catch (err) {
        console.log("Error, getSignup", err);
    }
};

restaurantController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("process Login page");
        res.send("DONE");
        
    } catch (err) {
        console.log("Error, processLogin", err);
    }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup");

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;

        const memberService = new MemberService();
        const result = await memberService.processSignup(newMember);

        res.send(result);
    } catch (err) {
        console.log("Error, processSignup", err);
        res.send(err);
    }
};

export default restaurantController;