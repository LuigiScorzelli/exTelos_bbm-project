import User from "./User";

export default class Player extends User {
  age = null;
  height = null;
  weight = null;

  constructor(id, { name = "", lastName = "", age, height = null, weight = null }) {
    super(id, {name, lastName, type: User.Type.PLAYER});
    this.age = age;
    this.height = height;
    this.weight = weight;
  }
}