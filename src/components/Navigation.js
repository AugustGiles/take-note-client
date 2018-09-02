import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

const Navigation = () => (
  <Modal
    trigger={<Button icon='list ul' style={{display: 'inline-block', float:'right'}}/>}
    size='tiny'
    content='Call Benjamin regarding the reports.'
  />
)

export default Navigation
