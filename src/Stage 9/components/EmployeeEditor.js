import React, { Component } from 'react';

class EmployeeEditor extends Component {
  // constructor
  constructor() {
    super();
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
  }

  // componentWillReceiveProps
  componentWillReceiveProps(props) {
    let employeeCopy = Object.assign({}, props.selected);

    this.setState({
      employee: employeeCopy,
      originalEmployee: props.selected,
      notModified: true,
    })
  }
  // handleChange
  handleChange(propName, value) {
    let employeeCopy = Object.assign({}, this.state.employee);
    employeeCopy[propName] = value;
    this.setState({employee: employeeCopy, notModified: false});
  }

  // save
  save() {
    this.state.originalEmployee.updateName(this.state.employee.name);
    this.state.originalEmployee.updateTitle(this.state.employee.title);
    this.state.originalEmployee.updatePhone(this.state.employee.phone);
    this.setState({notModified: true});
    this.props.refreshList();
  }

  // cancel
  cancel() {
    this.setState({employee: this.state.originalEmployee});
  }
  
  render() {
    return (
      <div className="infoCard">
        { 
          this.state.employee
          ? 
          <div>
            <span id="employeeID"> ID: { this.state.employee.id } </span>
            <p id="employeeTitle"> { this.state.originalEmployee.name } </p>
            <br />
            <button id="saveBtn" className="confirmationButton" disabled={this.state.notModified} onClick={ this.save }> Save </button>
            <button className="neutralButton" disabled={this.state.notModified} onClick={ this.cancel }> Cancel </button>
            <br />
            <span className="placeholderText"> Name </span>
            <input className="materialInput" value={ this.state.employee.name } onChange={ (e) => { this.handleChange('name', e.target.value) } }></input>
            <span className="placeholderText"> Phone Number </span>
            <input className="materialInput" value={ this.state.employee.phone } onChange={ (e) => { this.handleChange('phone', e.target.value) } }></input>
            <span className="placeholderText"> Title </span>
            <input className="materialInput" value={ this.state.employee.title } onChange={ (e) => { this.handleChange('title', e.target.value) } }></input>
          </div>
          :
          <p id="noEmployee"> No Employee Selected </p>
        }
       
      </div>
    )
  }
}

export default EmployeeEditor;