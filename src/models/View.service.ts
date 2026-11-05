import Errors, { HttpCode, Message } from "../controllers/libs/Errors";
import { View, ViewInput } from "../controllers/libs/types/view";
import ViewModel from "../schema/view.model";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistence(input: ViewInput): Promise<View | null> {
    return this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec() as Promise<View | null>;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return (await this.viewModel.create(input)) as unknown as View;
    } catch (err) {
      console.error("ERROR, model:insertMemberView", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
