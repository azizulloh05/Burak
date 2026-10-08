import { NextFunction, Request, Response } from 'express'
import { MemberType } from './libs/enums/member.enum'
import Errors, { Message } from './libs/Errors'
import { T } from './libs/types/common'
import { AdminRequest, LoginInput, MemberInput } from './libs/types/member'
import MemberService from "../models/Member.sevice"

const memberService = new MemberService()

// Restaurant controller uchun methodlar saqledi
const restaurantController: T = {};

// Go Home 
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log('goHome')
        res.render('home');
    } catch (err) {
        console.log('Error, go home', err);
        res.redirect("/admin");
    }
};

// Get Signup 
restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup')
        res.render('signup');
    } catch (err) {
        console.log('Error, getSignup', err);
        res.redirect("/admin");
    }
};

//  Get Login 
restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('getLogin')
        res.render('login');
    } catch (err) {
        console.log('Error, get login', err);
        res.redirect("/admin");
    }
};

// Process Signup 
restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log('processSignup');

        const newMember = (req.body ?? {}) as MemberInput;
        newMember.memberType = MemberType.RESTAURANT;
        const result = await    memberService.proccesSignup(newMember);

        req.session.member = result;
        res.send(result);
    } catch (err) {
        console.log('Error, processSignup', err);
       const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            '<script>alert("${message}"); window.location.replace ("/admin/signup") </script>'
        );
    }
};
restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log('processLogin')
        const input = (req.body ?? {}) as LoginInput;

        const result = await memberService.proccesLogin(input);

        req.session.member = result;
        res.send(result);
    } catch (err) {
        console.log('Error, processLogin', err);
        const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            '<script>alert("${message}"); window.location.replace ("/admin/login") </script>'
        );
    }
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        const session = req.session as any;

        session.destroy(() => {
            res.redirect("/admin");
        });
    } catch (err) {
        console.log('Error, logout', err);
        res.redirect("/admin");
    }
};

restaurantController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        console.log('checkAuthSession')
       if (req.session?.member)
         res.send('<script>alert("Hi, ${req.session.member.memberNick}")</script>');
       else res.send('<script>alert("${Message.NOT_AUTHORIZED}")</script>');
    } catch (err) {
        console.log('Error, checkAuthSession', err);
        res.send(err)
    }
};

restaurantController.verifyRestaurant = (
	req: AdminRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.session?.member?.memberType === MemberType.RESTAURANT) {
		req.member = req.session.member
		next()
	} else {
		const message = Message.NOT_AUTHENTICATED
		res.send(
			`<script> alert("${message}"); window.location.replace('/admin/login'); </script>`,
		)
	}
}

export default restaurantController;