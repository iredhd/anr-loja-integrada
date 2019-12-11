import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { View, Input, Icon, Typography, Button, Modal } from '.';

const getColor = ({ isDragAccept, isDragReject, theme }) => {
  if (isDragAccept) {
    return `${theme.DefaultColors.primary}`;
  }
  if (isDragReject) {
    return `${theme.DefaultColors.danger}`;
  }

  return `${theme.DefaultColors.primary}`;
};

const getBorder = props => {
  const color = getColor(props);

  if (props.isDragAccept) {
    return `1px dashed rgba(${color}, 1)`;
  }
  if (props.isDragReject) {
    return `2px dashed rgba(${color}, 1)`;
  }

  return `1px dashed rgba(${color}, 1)`;
};

const getBackground = props => {
  const color = getColor(props);

  if (props.isDragAccept) {
    return `${color}, .1`;
  }
  if (props.isDragReject) {
    return `${color}, .1`;
  }

  return `${color}, 0`;
};

const getIconFile = name => {
  const extension = name.split('.').pop();

  const iconExtensions = {
    png: 'file-image',
    jpg: 'file-image',
    jpeg: 'file-image',
    ico: 'file-image',
    gif: 'file-image',
    pdf: 'file-pdf',
    doc: 'file-word',
    docx: 'file-word',
    UNDEFINED: 'file'
  };

  return iconExtensions[extension] || iconExtensions.UNDEFINED;
};

const DropzoneContainer = styled(View)`
  flex-direction: column;
`;

const StyledDropzoneView = styled(View)`
  border: ${props => getBorder(props)};
  justify-content: center;
  background-color: rgba(${props => getBackground(props)});
  align-items: center;
  text-align: center;
  padding: 20px;
  margin-top: 5px;
  flex-wrap: wrap;

  :hover {
    cursor: pointer;
  }
`;

const Dropzone = ({ children, onDrop, acceptedTypes, files, onDeleteFileConfirm }) => {
  const modalDeleteMessage = 'Você tem certeza que deseja excluir:';
  const [modal, setModal] = useState({
    isVisible: false,
    body: ''
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: acceptedTypes
  });

  return (
    <DropzoneContainer>
      {files.length > 0
        && files.map((file, index) => (
          <DropzoneFileContainer
            key={index.toString()}
            name={file.name}
            onDelete={() => setModal({
              ...modal,
              isVisible: true,
              body: `${modalDeleteMessage} ${file.name} ?`,
              file: index
            })}
          />
        ))}
      <StyledDropzoneView {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <Input {...getInputProps()} />
        {children}
      </StyledDropzoneView>
      <Modal
        title="Atenção!"
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
        onCancel={() => setModal({ ...modal, isVisible: false })}
        onConfirm={() => { onDeleteFileConfirm(modal.file); setModal({ ...modal, isVisible: false }); }}
      >
        <Typography>
          {modal.body}
        </Typography>
      </Modal>
    </DropzoneContainer>
  );
};

const DropzoneFileContainer = ({ name, onDelete }) => {
  const StyledFileContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgb(${({ theme }) => theme.DefaultColors.primary});
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
  `;

  const StyledTypography = styled(Typography)`
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 10px;
    font-style: italic;
  `;

  const StyledInfoContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    flex-grow: unset;
  `;

  const StyledDeleteButton = styled(Button)`
    margin: 0px;
  `;

  return (
    <StyledFileContainer>
      <StyledInfoContainer>
        <Icon icon={getIconFile(name)} size="2x" />
        <StyledTypography>{name}</StyledTypography>
      </StyledInfoContainer>
      <StyledDeleteButton color="danger" onClick={onDelete}>
          Excluir
      </StyledDeleteButton>
    </StyledFileContainer>
  );
};

Dropzone.defaultProps = {
  children: <Typography>Clique ou arraste para cá os arquivos para upload.</Typography>,
  acceptedTypes: '*',
  files: []
};

Dropzone.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onDrop: PropTypes.func.isRequired,
  onDeleteFileConfirm: PropTypes.func.isRequired,
  acceptedTypes: PropTypes.string,
  files: PropTypes.array
};

DropzoneFileContainer.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Dropzone;
