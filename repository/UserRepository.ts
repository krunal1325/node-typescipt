import { UserAttributes } from "../models/user.model";
import { BaseRepository } from "./BaseRepository";

export default class UserRepository extends BaseRepository<UserAttributes> {
    constructor(model: typeof UserAttributes) {
        super(model);
    }
}
