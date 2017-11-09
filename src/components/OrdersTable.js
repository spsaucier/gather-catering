import React from "react";
import { Table, Input, InputNumber, Select, Button } from "antd";
import orders from "../constants/orders";
import products from "../constants/products";
const Option = Select.Option;

function randomDate(rangeOfDays) {
    var today = new Date(Date.now());
    var date = new Date(today.getYear()+1900,today.getMonth(), today.getDate()+Math.random() *rangeOfDays);
    return `${date.getYear() + 1900}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
}

const data = [];
for (let i = 0; i < orders.length; i++) {
  data.push({
    key: i.toString(),
    name: orders[i],
    date: randomDate(100),
    productIds: [],
    productQtys: []
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

const EditableSelect = ({ editable, value, onChange, placeholder }) => (
  <div>
    {editable ? (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={placeholder}
        optionFilterProp="children"
        value={value}
        onChange={onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {products.map((product, i) => (
          <Option key={i} value={i.toString()}>
            {product}
          </Option>
        ))}
      </Select>
    ) : (
      <span className="editable-value">{products[parseInt(value, 10)]}</span>
    )}
  </div>
);

const EditableNumber = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <InputNumber
        min={0}
        defaultValue={1}
        style={{ width: 80 }}
        value={value}
        onChange={onChange}
      />
    ) : (
      <span className="editable-value">{value}</span>
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
        title: "Date",
        dataIndex: "date",
        width: "60%",
        sorter: (a, b) => parseInt(a.date.split("-").join(""), 10) - parseInt(b.date.split("-").join(""), 10),
        render: (text, record) => this.renderColumns(text, record, "date")
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
  addProduct(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      target.productIds.push("");
      target.productQtys.push(1);
      this.setState({ data: newData });
    }
  }
  removeProduct(key, i) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.productIds.splice(i, 1);
      target.productQtys.splice(i, 1);
      this.setState({ data: newData });
    }
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
  handleArrayChange(value, key, column, columnKey) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column][columnKey] = value;
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
      <Table
        bordered
        dataSource={this.state.data}
        expandedRowRender={record => {
          return <div>
            {record.productIds.map((id, i) => {
              return <div key={i} style={{display: "flex", width: "100%"}}>
                <EditableNumber
                  editable={record.editable}
                  value={record.productQtys[i]}
                  onChange={value => this.handleArrayChange(value, record.key, "productQtys", i)}
                />
                <span className="times"> &times; </span>
                <EditableSelect
                  editable={record.editable}
                  value={record.productIds[i]}
                  placeholder="Select an product"
                  onChange={value => this.handleArrayChange(value, record.key, "productIds", i)}
                />
                {record.editable ? <Button
                  type="default"
                  icon="minus-circle-o"
                  style={{marginLeft: "8px"}}
                  onClick={() => this.removeProduct(record.key, i)}>Remove</Button> : ""}
              </div>
            })}
            <Button
              style={{marginTop: "5px"}}
              type="primary"
              icon="plus-circle-o"
              onClick={() => this.addProduct(record.key)}>Add product</Button>
          </div>
        }}
        columns={this.columns} />
    );
  }
}
