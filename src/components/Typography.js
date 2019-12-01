import styled from 'styled-components';
import PropTypes from 'prop-types';
import Theme from '../styles/layout';

const Typography = styled.span`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight}
  color: ${({ fontColor }) => fontColor};
  font-style: ${({ fontStyle }) => fontStyle};
  margin: 0px 3px 0px 3px;
`;

Typography.defaultProps = {
  fontSize: '17px',
  fontWeight: 'normal',
  fontColor: `rgb(${Theme.DefaultColors.primary})`,
  fontStyle: 'normal'
};

Typography.propTypes = {
  theme: PropTypes.object.isRequired,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  fontColor: PropTypes.string,
  fontStyle: PropTypes.string
};

export default Typography;