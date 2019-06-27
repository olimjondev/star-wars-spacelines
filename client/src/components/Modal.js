import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import './Modal.scss';

const TicketModal = ({btnText, header, planet}) => (
  <Modal trigger={<Button className="green">{btnText}</Button>} closeIcon>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Planet [{planet.name}]</Header>
        <p><b>Diameter:</b> {planet.diameter}</p>
        <p><b>Rotation period:</b> {planet.rotation_period}</p>
        <p><b>Climate:</b> {planet.climate}</p>
        <p><b>Population:</b> {planet.population / 1000000000} bln.</p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
)

export default TicketModal;