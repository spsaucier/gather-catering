import React from "react";
import DevTools from "mobx-react-devtools";
import { Table, Input } from "antd";

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
    console.info(props.ingredients.data)
    this.state = { data: props.ingredients.data.slice() }; // slice b/c https://mobx.js.org/refguide/array.html
    this.cacheData = props.ingredients.data.map(item => ({ ...item }));
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
      this.props.ingredients.save(newData);
      this.cacheData = newData.map(item => ({ ...item }));
      // Send save request
      // Save request goes to redux function (action creator)
      // which toggles "getting now"
      // then gets from API,
      // then calls dispatch to say that it has changed
      // reducer sorts it & returns a new state
      // Container picks up the change & passes it back in
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
    return <div>
        <Table bordered dataSource={this.state.data} columns={this.columns} pagination={{ pageSize: 50 }} expandedRowRender={record => {
            return <div>
                <h5>Products using this ingredient:</h5>
                <ul>
                  {record.products.length ? record.products.map(
                      (product, i) => <li key={i}>{product}</li>
                    ) : <p>
                      <em>No associated products</em>
                    </p>}
                </ul>
              </div>;
          }} />
        <DevTools />
      </div>;
  }
}
