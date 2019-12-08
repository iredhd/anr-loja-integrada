import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from '.';

const Modal = ({ size, isVisible, title, children, onClose, onCancel, onConfirm }) => {
  const StyledModalFooter = styled(BootstrapModal.Footer)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  return (
    <BootstrapModal
      size={size}
      show={isVisible}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <StyledModalFooter>
        <Button onClick={onCancel} color="danger">Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </StyledModalFooter>
    </BootstrapModal>
  );
};

Modal.defaultProps = {
  size: 'md'
};

Modal.propTypes = {
  size: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onCancel: PropTypes.func.isRequired
};

export default Modal;
