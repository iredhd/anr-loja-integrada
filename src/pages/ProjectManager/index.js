import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  console.log(form);
  const onDropFiles = (file, type = 'regular') => {
    if (type === 'encryptable') {
      setForm({ ...form, encryptableFiles: [...form.encryptableFiles, ...file] });
    } else {
      setForm({ ...form, regularFiles: [...form.regularFiles, ...file] });
    }
  };

  return (
    <Panel>
      <ProjectManagerLogo />
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
                acceptedTypes="image/*, .pdf"
                files={form.encryptableFiles}
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
                acceptedTypes="image/*, .pdf"
                files={form.regularFiles}
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