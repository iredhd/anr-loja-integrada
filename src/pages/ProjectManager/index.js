import React from 'react';
import PropTypes from 'prop-types';

import { Panel, View, Typography, Input } from '../../components';
import { ProjectManagerLogo, ProjectManagerForm, ProjectManagerInputGroup, UploadFilesView } from './styles';

const ProjectManager = ({ history }) => (
  <Panel>
    <ProjectManagerLogo />
    <View>
      <ProjectManagerForm>
        <ProjectManagerInputGroup>
          <Input placeholder="SKU" />
          <Input placeholder="Nome" />
        </ProjectManagerInputGroup>
        <ProjectManagerInputGroup>
          <UploadFilesView>
            <Typography fontStyle="italic">
              Clique aqui ou arraste para cá os arquivos que serão criptografados.
            </Typography>
          </UploadFilesView>
          <UploadFilesView>
            <Typography fontStyle="italic">
              Clique aqui ou arraste para cá os arquivos que serão criptografados.
            </Typography>
          </UploadFilesView>
        </ProjectManagerInputGroup>
      </ProjectManagerForm>
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