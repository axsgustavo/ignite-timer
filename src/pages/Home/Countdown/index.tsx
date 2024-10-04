import { CountdownContainer, Separator } from './styles'
import { Props } from './types'

export function Countdown({ minutes, seconds }: Props) {
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}