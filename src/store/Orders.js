import { observable } from "mobx";
import { generateOrders } from "../constants/mocker";

class Orders {
  @observable data = generateOrders();

  save(data) {
    this.data = data;
  }
}

export default Orders;
