import User from "./User";

export default class Account {
  id = null;
  username = "";
  password = "";
  role = null;
  userId = null;
  user = null;

  static Role = {
    ADMIN: "admin"
  };

  constructor(id, { username = "", password = "", role = null, userId = null}) {
    this.id = id
    this.username = username;
    this.password = password
    this.role = role
    this.userId = userId
  }

  get user() {
    return new User(this.teamId, this._user);
  }

  set user(value) {
    this._user = value;
  }
}
