export class Pickup {
  constructor(id, time, location, parent, children, status,date) {
    this.id = id;
    this.time = time;
    this.location = location;
    this.parent = parent;
    this.children = children;
    this.status = status;
    this.date = date;
  }
}
export default Pickup;
