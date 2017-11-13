import { observable } from "mobx";
import { generateAggregates } from "../constants/mocker";

class Aggregates {
  @observable data = generateAggregates()

  save(data) {
    this.data = data;
  }
}

export default Aggregates;
