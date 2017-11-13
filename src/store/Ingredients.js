import { observable } from "mobx";
import { generateIngredients } from "../constants/mocker";

class Ingredients {
  @observable data = generateIngredients();

  save(data) {
    this.data = data;
  }
}

export default Ingredients;
