import { HandPalm, Play } from 'phosphor-react'
import { useCycles } from '../../../contexts/Cycles'

import { Props } from './types'

import { StartCountdownButton, StopCountdownButton } from './styles'

export function CountdownButton({ type }: Props) {
  const { newFormCycle, handleInterruptedCycle } = useCycles()

  const task = newFormCycle.watch('task')
  const isSubmitDisabled = !task

  if (type === 'start') {
    return (
      <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
        <Play size={24} />
        Começar
      </StartCountdownButton>
    )
  } else if (type === 'stop') {
    return (
      <StopCountdownButton type="button" onClick={handleInterruptedCycle}>
        <HandPalm size={24} />
        Interromper
      </StopCountdownButton>
    )
  } else {
    return <></>
  }
}