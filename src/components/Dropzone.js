import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { View, Input, Icon, Typography } from '.';

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

const Dropzone = ({ children, onDrop, acceptedTypes, files }) => {
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
    <StyledDropzoneView {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <Input {...getInputProps()} />
      {files.length > 0
        ? files.map((file, _) => (
          <DropzoneFileContainer key={_.toString()} name={file.name} />
        ))
        : children}
    </StyledDropzoneView>
  );
};

const DropzoneFileContainer = ({ name }) => {
  const StyledFileContainer = styled(View)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(${({ theme }) => theme.DefaultColors.primary});
    border-radius: 5px;
    padding: 15px;
    width: 40%;
    margin: 5px;
    overflow: hidden;
    text-overflow:ellipsis;

    :hover {
      transform: scale(1.01);
    }
  `;

  const StyledTypography = styled(Typography)`
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 15px;
  `;

  return (
    <StyledFileContainer>
      <Icon icon={getIconFile(name)} size="3x" />
      <StyledTypography>{name}</StyledTypography>
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
  acceptedTypes: PropTypes.string,
  files: PropTypes.array
};

DropzoneFileContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default Dropzone;