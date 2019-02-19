export default class Team {
  id = null;
  denomination = "";
  players = [];

  constructor(id, { denomination = "" }) {
    this.denomination = denomination;
  }
  static Type = {
    BASKET: "basket",
    MINIBASKET: "minibasket"
  };
}
