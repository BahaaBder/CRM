import { observable, action, makeObservable } from "mobx";
const customers = require("./data.json");
export default class ClientsStore {
  constructor() {
    this.clients = [];
    this.currentPage = 0;
    this.input = "";
    this.owners = [];
    makeObservable(this, {
      owners: observable,
      clients: observable,
      currentPage: observable,
      input: observable,
      setOwners: action,
      setClients: action,
      setClientsPerPage: action,
    });
  }
  setClients = (clients) => {
    this.clients = clients;
  };

  setClientsPerPage = (clients, currentPage) => {
    this.clients = clients;
    this.currentPage = currentPage;
  };
  setOwners = (a) => {
    this.owners = a;
  };
}
