import React from "react";
import { Table, Input } from "antd";
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
    name: ingredients[i],
    unit: units[getRandomIntInclusive(0, 49)],
    description: "Picanha ball tip short loin filet mignon burgdoggen. Pancetta burgdoggen tongue"
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input
        style={{ margin: "-5px 0" }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      value
    )}
  </div>
);

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: "25%",
        render: (text, record) => this.renderColumns(text, record, "name")
      },
      {
        title: "Unit",
        dataIndex: "unit",
        width: "15%",
        render: (text, record) => this.renderColumns(text, record, "unit")
      },
      {
        title: "Description",
        dataIndex: "description",
        width: "40%",
        render: (text, record) => this.renderColumns(text, record, "description")
      },
      {
        title: "Operation",
        dataIndex: "operation",
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <a onClick={() => this.cancel(record.key)}>Cancel</a>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        }
      }
    ];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  render() {
    return (
      <Table bordered dataSource={this.state.data} columns={this.columns} pagination={{pageSize: 50}} />
    );
  }
}
