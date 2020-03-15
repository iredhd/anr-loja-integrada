import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { View, Typography, Input, Dropzone, Modal } from '../../components';
import { ProjectManagerPanel, ProjectManagerLoadingWrapper, ProjectManagerLogo, ProjectManagerForm, ProjectManagerInputGroup, ProjectManagerDropzoneContainer, ProjectManagerSaveButton, ProjectManagerContainer } from './styles';
import { Project } from '../../services';

const ProjectManager = ({ history }) => {
  const { id } = useParams();

  const [form, setForm] = useState({
    sku: '',
    name: '',
    encryptableFiles: [],
    regularFiles: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState({
    isVisible: false,
    body: ''
  });

  const loadProject = useCallback(() => {
    setIsLoading(true);
    Project.getProject(id)
      .then(project => {
        setForm(project);
        setIsLoading(false);
      })
      .catch(() => history.push('/projects-manager'));
  }, [id, history]);

  const handleSubmit = useCallback(() => {
    if (!form.name || !form.sku || !form.encryptableFiles.length) {
      setModal({
        isVisible: true,
        body: 'Preencha todos os campos obrigatórios.'
      });
      return;
    }

    setIsLoading(true);
    Project.upsertProject(form)
      .then(() => {
        setIsLoading(false);
        history.push('/projects-manager');
      })
      .catch(e => console.log('error', e));
  }, [form, history]);

  const closeModal = useCallback(() => {
    setModal({
      isVisible: false,
      body: ''
    });
  }, [setModal]);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id, loadProject]);

  const onDropFiles = (file, type = 'regular') => {
    if (type === 'encryptable') {
      setForm({ ...form, encryptableFiles: [...form.encryptableFiles, ...file] });
    } else {
      setForm({ ...form, regularFiles: [...form.regularFiles, ...file] });
    }
  };

  return (
    <ProjectManagerPanel>
      <Link to="/home">
        <ProjectManagerLogo />
      </Link>
      <ProjectManagerContainer>
        <ProjectManagerLoadingWrapper
          isLoading={isLoading}
          progressBarProps={{
            progress: 50
          }}
        >
          <View>
            <ProjectManagerForm>
              <ProjectManagerInputGroup>
                <Input
                  placeholder="SKU *"
                  value={form.sku}
                  onChange={({ target: { value: sku } }) => setForm({ ...form, sku })}
                />
                <Input
                  placeholder="Nome *"
                  value={form.name}
                  onChange={({ target: { value: name } }) => setForm({ ...form, name })}
                />
              </ProjectManagerInputGroup>
              <ProjectManagerInputGroup>
                <ProjectManagerDropzoneContainer>
                  <Typography fontWeight="bold">Arquivos criptografáveis: *</Typography>
                  <Dropzone
                    onDrop={file => onDropFiles(file, 'encryptable')}
                    acceptedTypes="application/pdf"
                    files={form.encryptableFiles}
                    onDeleteFileConfirm={indexToExclude => {
                      setForm({
                        ...form,
                        encryptableFiles: form.encryptableFiles.filter((_, index) => index !== indexToExclude)
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
                    acceptedTypes=".jpeg, .png, .jpg, .pes, .pdf"
                    files={form.regularFiles}
                    onDeleteFileConfirm={indexToExclude => {
                      setForm({
                        ...form,
                        regularFiles: form.regularFiles.filter((_, index) => index !== indexToExclude)
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
                <ProjectManagerSaveButton onClick={handleSubmit}>Salvar</ProjectManagerSaveButton>
              </ProjectManagerInputGroup>
            </ProjectManagerForm>
          </View>
        </ProjectManagerLoadingWrapper>
      </ProjectManagerContainer>
      <Modal
        title="Atenção!"
        isVisible={modal.isVisible}
        onClose={closeModal}
        onConfirm={closeModal}
      >
        <Typography>
          {modal.body}
        </Typography>
      </Modal>
    </ProjectManagerPanel>
  );
};

ProjectManager.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ProjectManager;
