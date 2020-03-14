import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ProjectsManagerLogo, ProjectsManagerPanel, ProjectCard, ProjectCardInfo, ProjectCardActions, ProjectsManagerActionBar, ProjectsManagerLoadingWrapper } from './styles';
import { Typography, View, Button, Icon, Modal } from '../../components';
import { Project } from '../../services';

const ProjectsManager = ({ history }) => {
  const modalDeleteMessage = 'Você tem certeza que deseja excluir:';

  const [projects, setProjects] = useState([]);

  const [modal, setModal] = useState({
    isVisible: false,
    body: '',
    project: null
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    try {
      const projects = await Project.getProjects();
      setProjects(projects);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [setProjects, setIsLoading]);

  const deleteProject = useCallback(() => {
    setIsLoading(true);

    setModal({ ...modal, isVisible: false });
    Project.deleteProject(modal.project)
      .then(() => {
        loadProjects();
      })
      .catch(e => console.error(e));
  }, [setIsLoading, setModal, loadProjects, modal]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <ProjectsManagerPanel>
      <Link to="/home">
        <ProjectsManagerLogo />
      </Link>
      <ProjectsManagerActionBar>
        <Button onClick={() => history.push('/projects-manager/create')}>
          <Icon icon="plus" />
        </Button>
      </ProjectsManagerActionBar>
      <ProjectsManagerLoadingWrapper
        isLoading={isLoading}
        progressBarProps={{
          progress: 50
        }}
      >
        {
        projects.length > 0
          ? projects.map(({ sku, name }, index) => (
            <ProjectCard key={index.toString()}>
              <ProjectCardInfo>
                <View>
                  <Typography fontWeight="bold">SKU: </Typography>
                  <Typography>
                    {sku}
                  </Typography>
                </View>
                <View>
                  <Typography fontWeight="bold">Nome: </Typography>
                  <Typography>
                    {name}
                  </Typography>
                </View>
              </ProjectCardInfo>
              <ProjectCardActions>
                <Button onClick={() => history.push(`/projects-manager/${sku}`)}>
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setModal({
                      ...modal,
                      isVisible: true,
                      body: `${modalDeleteMessage} ${name} ?`,
                      project: sku
                    });
                  }}
                >
                  Excluir
                </Button>
              </ProjectCardActions>
            </ProjectCard>
          ))
          : (
            <ProjectCard>
              <ProjectCardInfo>
                <View>
                  <Typography>
                    Nenhum projeto cadastrado. Clique no &quot;+&quot; para cadastrar
                  </Typography>
                </View>
              </ProjectCardInfo>
            </ProjectCard>
          )
        }
      </ProjectsManagerLoadingWrapper>
      <Modal
        title="Atenção!"
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
        onCancel={() => setModal({ ...modal, isVisible: false })}
        onConfirm={deleteProject}
      >
        <Typography>
          {modal.body}
        </Typography>
      </Modal>
    </ProjectsManagerPanel>
  );
};

ProjectsManager.propTypes = {
  history: PropTypes.object.isRequired
};

export default ProjectsManager;
