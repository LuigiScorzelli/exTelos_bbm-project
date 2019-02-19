import User from "./User";

export default class Coach extends User {
  constructor(id, {name = "", lastName = ""}) {
    super(id, {name, lastName, type: User.Type.COACH});
  }
}