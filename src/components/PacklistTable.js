import React from "react";
import { Table } from "antd";

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Quantity",
        className: "tar",
        dataIndex: "quantity",
        sorter: (a, b) => a.quantity - b.quantity,
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
    this.state = { data: props.aggregates.data.slice() }; // slice b/c https://mobx.js.org/refguide/array.html
    this.cacheData = props.aggregates.data.map(item => ({ ...item }));
  }
  render() {
    return <Table dataSource={this.state.data} columns={this.columns} size="small" pagination={{ pageSize: 50 }} />;
  }
}
