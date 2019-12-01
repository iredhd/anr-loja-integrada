import React from 'react';
import PropTypes from 'prop-types';

import { ProjectsManagerLogo, ProjectsManagerPanel, ProjectCard, ProjectCardInfo, ProjectCardActions } from './styles';
import { Typography, View, Button } from '../../components';

const ProjectsManager = ({ history }) => {
  return (
    <ProjectsManagerPanel>
      <ProjectsManagerLogo />
      <ProjectCard>
        <ProjectCardInfo>
          <View>
            <Typography fontWeight="bold">SKU: </Typography>
            <Typography>
                C9JDJ8SXA
            </Typography>
          </View>
          <View>
            <Typography fontWeight="bold">Nome: </Typography>
            <Typography>
            [PROJETO] Maleta Tildinha
            </Typography>
          </View>
        </ProjectCardInfo>
        <ProjectCardActions>
          <Button onClick={() => history.push('/projects-manager/1')}>
              Editar
          </Button>
          <Button color="danger" onClick={() => history.push('/projects-manager/1')}>
              Excluir
          </Button>
        </ProjectCardActions>
      </ProjectCard>
    </ProjectsManagerPanel>
  );
};

ProjectsManager.propTypes = {
  history: PropTypes.object.isRequired
};

export default ProjectsManager;