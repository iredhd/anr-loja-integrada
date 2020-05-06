import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { Typography, Input, Modal } from '../../components';
import { CourseManagerPanel, CourseManagerLoadingWrapper, CourseManagerLogo, CourseManagerForm, CourseManagerInputGroup, CourseManagerSaveButton, CourseManagerContainer, CourseManagerFormContainer } from './styles';
import { Course } from '../../services';

const CourseManager = ({ history }) => {
  const { id } = useParams();

  const [form, setForm] = useState({
    sku: '',
    name: '',
    link: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState({
    isVisible: false,
    body: ''
  });

  const loadCourse = useCallback(() => {
    setIsLoading(true);
    Course.getCourse(id)
      .then(project => {
        setForm(project);
        setIsLoading(false);
      })
      .catch(() => history.push('/courses-manager'));
  }, [id, history]);

  const handleSubmit = useCallback(() => {
    if (!form.name.trim() || !form.sku.trim() || !form.link.trim()) {
      setModal({
        isVisible: true,
        body: 'Preencha todos os campos obrigatórios.'
      });
      return;
    }

    setIsLoading(true);
    Course.upsertCourse(form)
      .then(() => {
        setIsLoading(false);
        history.push('/courses-manager');
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
      loadCourse();
    }
  }, [id, loadCourse]);

  return (
    <CourseManagerPanel>
      <Link to="/home">
        <CourseManagerLogo />
      </Link>
      <CourseManagerContainer>
        <CourseManagerLoadingWrapper
          isLoading={isLoading}
          progressBarProps={{
            progress: 50
          }}
        >
          <CourseManagerFormContainer>
            <CourseManagerForm>
              <CourseManagerInputGroup>
                <Input
                  disabled={id}
                  placeholder="SKU *"
                  value={form.sku}
                  onChange={({ target: { value: sku } }) => setForm({ ...form, sku })}
                />
                <Input
                  placeholder="Nome *"
                  value={form.name}
                  onChange={({ target: { value: name } }) => setForm({ ...form, name })}
                />
                <Input
                  placeholder="Link *"
                  value={form.link}
                  onChange={({ target: { value: link } }) => setForm({ ...form, link })}
                />
              </CourseManagerInputGroup>
              <CourseManagerInputGroup direction="row" justifycontent="center">
                <CourseManagerSaveButton onClick={handleSubmit}>Salvar</CourseManagerSaveButton>
              </CourseManagerInputGroup>
            </CourseManagerForm>
          </CourseManagerFormContainer>
        </CourseManagerLoadingWrapper>
      </CourseManagerContainer>
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
    </CourseManagerPanel>
  );
};

CourseManager.propTypes = {
  history: PropTypes.object.isRequired,
};

export default CourseManager;
