import { randomDate, getRandomIntInclusive } from "../utils";
import ingredientNames from "./ingredients";
import productNames from "./products";
import unitNames from "./units";
import orderNames from "./orders";

function generateIngredients() {
  const data = [];
  for (let i = 0; i < ingredientNames.length; i++) {
    let ingredient = {
      key: i.toString(),
      name: ingredientNames[i],
      unit: unitNames[getRandomIntInclusive(0, 49)],
      description:
        "Picanha ball tip short loin filet mignon burgdoggen. Pancetta burgdoggen tongue"
    };
    let assocProducts = [];
    let numberOfProducts = getRandomIntInclusive(0, 4);
    for (var index = 0; index < numberOfProducts; index++) {
      assocProducts.push(
        productNames[getRandomIntInclusive(0, productNames.length)]
      );
    }
    ingredient.products = assocProducts;
    data.push(ingredient);
  }
  return data;
}

function generateProducts() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      name: productNames[i % 22],
      description:
        "Picanha ball tip short loin filet mignon burgdoggen. Pancetta burgdoggen tongue",
      ingredientIds: [],
      ingredientQtys: []
    });
  }
  return data;
}

function generateOrders() {
  const data = [];
  for (let i = 0; i < orderNames.length; i++) {
    data.push({
      key: i.toString(),
      name: orderNames[i],
      date: randomDate(100),
      productIds: [],
      productQtys: []
    });
  }
  return data;
}

function generateAggregates() {
  const data = [];
  for (let i = 0; i < ingredientNames.length; i++) {
    data.push({
      key: i.toString(),
      quantity: getRandomIntInclusive(1, 13),
      name: ingredientNames[i],
      unit: unitNames[getRandomIntInclusive(0, 49)],
      description:
        "Picanha ball tip short loin filet mignon burgdoggen. Pancetta burgdoggen tongue"
    });
  }
  return data;
}

export {generateIngredients, generateProducts, generateOrders, generateAggregates};
