import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components/macro'


const Button = styled.button`
    font-size: 0.75em;
    margin: 1em;
    padding: 0.5em 1em;
    border: 2px solid black;
    border-radius: 3px;
    float: left;
`

const Wrapper = styled.div`
    display: inline-block;
    float: left;
`


class UserModal extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    render () {
      return (
        <Wrapper>
          <Button onClick={this.handleOpenModal}>View Your Stats! </Button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example"
          >
            <Button onClick={this.handleCloseModal}>Close</Button>
          </ReactModal>
        </Wrapper>
      );
    }
  }



export default UserModal;

