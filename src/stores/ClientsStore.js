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
      updateClient: action,
    });
  }
  setClients = (clients) => {
    this.clients = clients;
  };

  updateClient = (customerData) => {
    this.clients.forEach((c) => {
      if (c.id === customerData.id) {
        c.first = customerData.first;
        c.last = customerData.last;
        c.country = customerData.country;
      }
    });
  };

  setClientsPerPage = (clients, currentPage) => {
    this.clients = clients;
    this.currentPage = currentPage;
  };
  setOwners = (a) => {
    this.owners = a;
  };
}
