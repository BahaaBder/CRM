import { observable, action, makeObservable } from "mobx";
const customers = require("./data.json");
export default class ClientsStore {
  constructor() {
    this.data = [];
    this.owners = [];
    makeObservable(this, {
      data: observable,
      owners: observable,
      setOwners: action,
    });
  }

  setOwners = (a) => {
    this.owners = a;
  };
}
