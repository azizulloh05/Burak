import  express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import makeUploader from "./controllers/libs/utils/uploader";
import uploader from "./controllers/libs/utils/uploader";

//member
router
.post("/login",memberController.login);
router
.post("/signup",memberController.signup);
router.post(
	'/member/logout',
	memberController.verifyAuth,
	memberController.logout,
)
router.get(
	'/member/detail',
	memberController.verifyAuth,
	memberController.getMemberDetail,
);
router.post(
	'/member/update',
	memberController.verifyAuth,
	uploader("members").single("memberImage"),
	memberController.updateMember,
);
router.get("/member/top-users", memberController.getTopUsers);

// Product
// Order

export default router;