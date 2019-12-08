import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Panel, View, Typography, Input, Dropzone } from '../../components';
import { ProjectManagerLogo, ProjectManagerForm, ProjectManagerInputGroup, ProjectManagerDropzoneContainer, ProjectManagerSaveButton  } from './styles';

const ProjectManager = ({ history }) => {
  const [form, setForm] = useState({
    sku: 'USD9340A',
    name: '[PROJETO] Tildinha',
    encryptableFiles: [{
      name: 'Projeto_Maleta_Tildinha.pdf'
    }],
    regularFiles: [{
      name: 'Projeto_Maleta_Tildinha.png'
    }, {
      name: 'Projeto_Maleta_Tildinha.png'
    }]
  });

  const onDropFiles = (file, type = 'regular') => {
    if (type === 'encryptable') {
      setForm({ ...form, encryptableFiles: [...form.encryptableFiles, ...file] });
    } else {
      setForm({ ...form, regularFiles: [...form.regularFiles, ...file] });
    }
  };

  return (
    <Panel>
      <Link to="/home">
        <ProjectManagerLogo />
      </Link>
      <View>
        <ProjectManagerForm>
          <ProjectManagerInputGroup>
            <Input
              placeholder="SKU"
              value={form.sku}
              onChange={({ target: { value: sku } }) => setForm({ ...form, sku })}
            />
            <Input
              placeholder="Nome"
              value={form.name}
              onChange={({ target: { value: name } }) => setForm({ ...form, name })}
            />
          </ProjectManagerInputGroup>
          <ProjectManagerInputGroup>
            <ProjectManagerDropzoneContainer>
              <Typography fontWeight="bold">Arquivos criptografáveis:</Typography>
              <Dropzone
                onDrop={file => onDropFiles(file, 'encryptable')}
                acceptedTypes="image/*, application/pdf"
                files={form.encryptableFiles}
                onDeleteFileConfirm={indexToExclude => {
                  setForm({
                    ...form,
                    encryptableFiles: form.encryptableFiles.filter((file, index) => index !== indexToExclude)
                  });
                }}
              >
                <Typography fontStyle="italic">
              Clique aqui ou arraste para cá os arquivos que serão criptografados.
                </Typography>
              </Dropzone>
            </ProjectManagerDropzoneContainer>
            <ProjectManagerDropzoneContainer>
              <Typography fontWeight="bold">Arquivos não criptografáveis:</Typography>
              <Dropzone
                onDrop={file => onDropFiles(file)}
                acceptedTypes="image/*, application/pdf"
                files={form.regularFiles}
                onDeleteFileConfirm={indexToExclude => {
                  setForm({
                    ...form,
                    regularFiles: form.regularFiles.filter((file, index) => index !== indexToExclude)
                  });
                }}
              >
                <Typography fontStyle="italic">
              Clique aqui ou arraste para cá os arquivos que serão criptografados.
                </Typography>
              </Dropzone>
            </ProjectManagerDropzoneContainer>
          </ProjectManagerInputGroup>
          <ProjectManagerInputGroup direction="row" justifycontent="center">
            <ProjectManagerSaveButton onClick={() => history.push('/projects-manager')}>Salvar</ProjectManagerSaveButton>
          </ProjectManagerInputGroup>
        </ProjectManagerForm>
      </View>
    </Panel>
  );
};

ProjectManager.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default ProjectManager;