import React from 'react';
import PropTypes from 'prop-types';

import { Panel, View, Typography } from '../../components';
import { ProjectManagerLogo } from './styles';

const ProjectManager = ({ history, match: { params: { id } } }) => (
  <Panel>
    <ProjectManagerLogo />
    <View>
      <Typography fontWeight="bold">{`ID: ${id}`}</Typography>
    </View>
  </Panel>
);

ProjectManager.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default ProjectManager;