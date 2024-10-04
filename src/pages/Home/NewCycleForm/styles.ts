import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  color: ${props => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
`

const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;

  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.theme['gray-500']};

  color: ${props => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;

  &::placeholder {
    color: ${props => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-bottom-color: ${props => props.theme['green-500']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    color: ${props => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
  text-align: center;
`