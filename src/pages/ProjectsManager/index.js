import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ProjectsManagerLogo, ProjectsManagerPanel, ProjectCard, ProjectCardInfo, ProjectCardActions, ProjectsManagerActionBar } from './styles';
import { Typography, View, Button, Icon, Modal } from '../../components';

const ProjectsManager = ({ history }) => {
  const modalDeleteMessage = 'Você tem certeza que deseja excluir:';

  const [projects, setProjects] = useState([{
    sku: 'C9JDJ8SXA',
    name: '[PROJETO] Maleta Tildinha'
  }, {
    sku: 'C9JDJ8SXA',
    name: '[PROJETO] Maleta Tildinha'
  }]);

  const [modal, setModal] = useState({
    isVisible: false,
    body: '',
    project: null
  });

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
                <Button onClick={() => history.push(`/projects-manager/${index}`)}>
                  Editar
                </Button>
                <Button color="danger" onClick={() => { setModal({ ...modal, isVisible: true, body: `${modalDeleteMessage} ${name} ?`, project: index }); }}>
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
      <Modal
        title="Atenção!"
        isVisible={modal.isVisible}
        onClose={() => setModal({ ...modal, isVisible: false })}
        onCancel={() => setModal({ ...modal, isVisible: false })}
        onConfirm={() => { setProjects(projects.filter((project, index) => index !== modal.project)); setModal({ ...modal, isVisible: false }); }}
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