export default class Event {
  id = null;
  team = null;
  users = null;
  startTime = "";
  endTime = "";
  type = "";
  description = "";

  constructor(id, { team, users, startTime, endTime, type, description }) {
    this.team = team;
    this.users = users;
    this.startTime = startTime;
    this.endTime = endTime;
    this.type = type;
    this.description = description;
  }
}
