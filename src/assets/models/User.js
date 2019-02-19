export default class User {
  id = null;
  name = "";
  lastName = "";
  type = null;

  constructor(id, { name = "", lastName = "", type = null }) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.type = type;
  }

  static Type = {
    COACH: "coach",
    MANAGER: "manager",
    PLAYER: "player"
  };
}
