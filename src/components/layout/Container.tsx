import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SContainer = styled.div`
  width: 768px;
  margin: auto;
`;

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <SContainer className={className}>{children}</SContainer>;
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
};
