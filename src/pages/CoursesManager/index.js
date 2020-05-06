import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CoursesManagerLogo, CoursesManagerPanel, CourseCard, CourseCardInfo, CourseCardActions, CoursesManagerActionBar, CoursesManagerLoadingWrapper } from './styles';
import { Typography, View, Button, Icon, Modal } from '../../components';
import { Course } from '../../services';

const CoursesManager = ({ history }) => {
  const modalDeleteMessage = 'Você tem certeza que deseja excluir:';

  const [courses, setCourses] = useState([]);

  const [modal, setModal] = useState({
    isVisible: false,
    body: '',
    course: null
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadCourses = useCallback(async () => {
    try {
      const courses = await Course.getCourses();
      setCourses(courses);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [setCourses, setIsLoading]);

  const deleteProject = useCallback(() => {
    setIsLoading(true);

    setModal({ ...modal, isVisible: false });
    Course.deleteCourse(modal.course)
      .then(() => {
        loadCourses();
      })
      .catch(e => console.error(e));
  }, [setIsLoading, setModal, loadCourses, modal]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <CoursesManagerPanel>
      <Link to="/home">
        <CoursesManagerLogo />
      </Link>
      <CoursesManagerActionBar>
        <Button onClick={() => history.push('/courses-manager/create')}>
          <Icon icon="plus" />
        </Button>
      </CoursesManagerActionBar>
      <CoursesManagerLoadingWrapper
        isLoading={isLoading}
        progressBarProps={{
          progress: 50
        }}
      >
        {
        courses.length > 0
          ? courses.map(({ sku, name }, index) => (
            <CourseCard key={index.toString()}>
              <CourseCardInfo>
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
              </CourseCardInfo>
              <CourseCardActions>
                <Button onClick={() => history.push(`/courses-manager/${sku}`)}>
                  Editar
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setModal({
                      ...modal,
                      isVisible: true,
                      body: `${modalDeleteMessage} ${name} ?`,
                      course: sku
                    });
                  }}
                >
                  Excluir
                </Button>
              </CourseCardActions>
            </CourseCard>
          ))
          : (
            <CourseCard>
              <CourseCardInfo>
                <View>
                  <Typography>
                    Nenhum curso cadastrado. Clique no &quot;+&quot; para cadastrar
                  </Typography>
                </View>
              </CourseCardInfo>
            </CourseCard>
          )
        }
      </CoursesManagerLoadingWrapper>
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
    </CoursesManagerPanel>
  );
};

CoursesManager.propTypes = {
  history: PropTypes.object.isRequired
};

export default CoursesManager;
