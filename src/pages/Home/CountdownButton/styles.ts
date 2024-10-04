import styled from 'styled-components'

const BaseCountdownButton = styled.button`
  width: 100%;
  padding: 1rem;

  border: 0;
  border-radius: 8px;
  transition: background-color 0.15s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${props => props.theme['gray-100']};
  font-weight: bold;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['red-700']};
  }
`