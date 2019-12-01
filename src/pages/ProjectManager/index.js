import React from 'react';
import PropTypes from 'prop-types';

import { ProjectManagerLogo, ProjectManagerPanel, ProjectCard, ProjectCardInfo, ProjectCardActions } from './styles';
import { Typography, View, Button } from '../../components';

const ProjectManager = ({ history }) => {
  return (
    <ProjectManagerPanel>
      <ProjectManagerLogo />
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
    </ProjectManagerPanel>
  );
};

ProjectManager.propTypes = {
  history: PropTypes.object.isRequired
};

export default ProjectManager;