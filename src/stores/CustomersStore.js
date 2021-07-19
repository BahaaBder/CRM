import { observable, action, makeObservable } from "mobx";
const customers = require("./data.json");
export default class CustomersStore {
  constructor() {
    this.data = [];
    this.owners = [];
    makeObservable(this, {
      data: observable,
      owners: observable,
      setOwners: action,
    });
  }
  loadData = () => {
    this.data = customers;
  };
  setOwners = (a) => {
    this.owners = a;
  };
}
