import React, { Component } from 'react'
import { Form, Dropdown, TextArea } from 'semantic-ui-react'

import { practiceAmounts } from '../data/practiceAmounts'
import '../styles/CreateAssignment.css'

export default class CreateAssignment extends Component {

  studentOptions = () => {
    return this.props.students.map(student => {
      return {key: student.id, value: student.id, text: student.username}
    })
  }

  render () {

    return (
      <Form>

          <Dropdown
            placeholder='Select Student'
            fluid search selection
            options={this.studentOptions()}
          />
          <Dropdown
            placeholder='Select Practice Time'
            fluid search selection 
            options={practiceAmounts}
          />


        <TextArea placeholder='Tell us more' rows={20}/>
      </Form>
    )
  }

}
