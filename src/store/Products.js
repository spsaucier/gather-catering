import { observable } from "mobx";
import { generateProducts } from "../constants/mocker";

class Products {
  @observable data = generateProducts();

  save(data) {
    this.data = data;
  }
}

export default Products;
