import { Request, Response } from "express";
import { T } from "./libs/types/common";
import MemberService from "../models/Member.sevice";
import { MemberType } from "./libs/enums/member.enum";
import { LoginInput, MemberInput } from "./libs/types/member";


const memberService = new MemberService();

// Restaurant controller uchun methodlar saqledi
const restaurantController: T = {};

// Go Home 
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log('goHome')
        res.render('home');
    } catch (err) {
        console.log('Error, go home', err);
    }
};

// Get Signup 
restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup')
        res.render('signup');
    } catch (err) {
        console.log('Error, getSignup', err);
    }
};

//  Get Login 
restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('getLogin')
        res.render('login');
    } catch (err) {
        console.log('Error, get login', err);
    }
};

// Process Signup 
restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log('processSignup');

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;

        const result = await memberService.proccesSignup(newMember);
        // TODO: Sessions Authentication

        res.send(result);
    } catch (err) {
        console.log('Error, processSignup', err);
        res.send(err);

    }
};

// Process Login 
restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log('processLogin')
        console.log("body:", req.body)
        const input: LoginInput = req.body;
        
        const result = await memberService.proccesLogin(input);
        // TODO: Tokens Authentication

        res.send(result);
    } catch (err) {
        console.log('Error, processLogin', err);
        res.send(err)
    }
};

export default restaurantController;