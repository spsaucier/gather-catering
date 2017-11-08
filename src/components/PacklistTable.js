import React from "react";
import { Table } from "antd";
import ingredients from "../constants/ingredients";
import units from "../constants/units";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const data = [];
for (let i = 0; i < ingredients.length; i++) {
  data.push({
    key: i.toString(),
    quantity: getRandomIntInclusive(1, 13),
    name: ingredients[i],
    unit: units[getRandomIntInclusive(0, 49)],
    description: "Picanha ball tip short loin filet mignon burgdoggen. Pancetta burgdoggen tongue"
  });
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Quantity",
        className: "tar",
        dataIndex: "quantity",
        render: (text, record) => text
      },
      {
        title: "Unit",
        className: "tac",
        dataIndex: "unit",
        render: (text, record) => text
      },
      {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => text
      },
      {
        title: "Description",
        dataIndex: "description",
        render: (text, record) => text
      }
    ];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  render() {
    return <Table dataSource={this.state.data} columns={this.columns} size="small" pagination={{ pageSize: 50 }} />;
  }
}
