import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SContainer = styled.div`
  width: 768px;
  margin: auto;
`;

export default function Container({ children }) {
  return (
    <SContainer>
      {children}
    </SContainer>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}