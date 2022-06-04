import styled from 'styled-components';

const SContainer = styled.div`
  width: 768px;
  margin: auto;
`;

export default function Container({children}) {
  return (
    <SContainer>
      {children}
    </SContainer>
  );
}