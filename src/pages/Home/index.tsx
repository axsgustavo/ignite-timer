import { useCycles } from '../../contexts/Cycles'
import { CountdownButton } from './CountdownButton'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

import { HomeContainer } from './styles'

export function Home () {
  const {
    newFormCycle,
    activeCycle,
    minutes,
    seconds,
    handleCreateNewCicle
  } = useCycles()

  return (
    <HomeContainer>
      <form onSubmit={newFormCycle.handleSubmit(handleCreateNewCicle)}>
        <NewCycleForm />
        <Countdown minutes={minutes} seconds={seconds} />

        {activeCycle ? (
          <CountdownButton type="stop" />
         ) : (
          <CountdownButton type="start" />
        )}
      </form>
    </HomeContainer>
  )
}