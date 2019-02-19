import User from "./User";

export default class Manager extends User {
  constructor(id, {name = "", lastName = ""}) {
    super(id, {name, lastName, type: User.Type.MANAGER});
  }
}