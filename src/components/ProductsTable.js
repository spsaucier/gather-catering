import React from "react";
import { Table, Input, InputNumber, Select, Button } from "antd";
const Option = Select.Option;

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

const EditableSelect = ({
  ingredients,
  editable,
  value,
  onChange,
  placeholder
}) => (
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
        {ingredients.map((ingredient, i) => (
          <Option key={i} value={i.toString()}>
            {ingredient.name}
          </Option>
        ))}
      </Select>
    ) : (
      <span className="editable-value">{ingredients[parseInt(value, 10)].name}</span>
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
        title: "Description",
        dataIndex: "description",
        width: "60%",
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
    this.state = { data: props.products.data.slice() }; // slice b/c https://mobx.js.org/refguide/array.html
    this.cacheData = props.products.data.map(item => ({ ...item }));
  }
  addIngredient(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      target.ingredientIds.push("");
      target.ingredientQtys.push(1);
      this.setState({ data: newData });
    }
  }
  removeIngredient(key, i) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.ingredientIds.splice(i, 1);
      target.ingredientQtys.splice(i, 1);
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
            {record.ingredientIds.map((id, i) => {
              return <div key={i} style={{display: "flex", width: "100%"}}>
                <EditableNumber
                  editable={record.editable}
                  value={record.ingredientQtys[i]}
                  onChange={value => this.handleArrayChange(value, record.key, "ingredientQtys", i)}
                />
                <span className="times"> &times; </span>
                <EditableSelect
                  ingredients={this.props.ingredients.data}
                  editable={record.editable}
                  value={record.ingredientIds[i]}
                  placeholder="Select an Ingredient"
                  onChange={value => this.handleArrayChange(value, record.key, "ingredientIds", i)}
                />
                {record.editable ? <Button
                  type="default"
                  icon="minus-circle-o"
                  style={{marginLeft: "8px"}}
                  onClick={() => this.removeIngredient(record.key, i)}>Remove</Button> : ""}
              </div>
            })}
            <Button
              style={{marginTop: "5px"}}
              type="primary"
              icon="plus-circle-o"
              onClick={() => this.addIngredient(record.key)}>Add Ingredient</Button>
          </div>
        }}
        columns={this.columns} />
    );
  }
}
