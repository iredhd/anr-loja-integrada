import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button } from '.';
import Theme from '../styles/layout';

const Modal = ({ size, isVisible, title, children, onClose, onCancel, onConfirm }) => {
  const StyledModalFooter = styled(BootstrapModal.Footer)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const StyledModalTitle = styled(BootstrapModal.Title)`
    color: ${() => `rgb(${Theme.DefaultColors.primary})`};
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
        <StyledModalTitle>
          {title}
        </StyledModalTitle>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <StyledModalFooter>
        {onCancel && <Button onClick={onCancel} color="danger">Cancelar</Button>}
        {onConfirm && <Button onClick={onConfirm}>Confirmar</Button>}
      </StyledModalFooter>
    </BootstrapModal>
  );
};

Modal.defaultProps = {
  size: 'md',
  onConfirm: null,
  onCancel: null
};

Modal.propTypes = {
  size: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onCancel: PropTypes.func
};

export default Modal;
