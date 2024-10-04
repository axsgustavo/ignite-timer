import { cyclesReducer } from '../../reducers/cycles/reducer'
import { differenceInSeconds } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import {
  addNewCycleAction,
  interruptedCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from '../../reducers/cycles/actions'

import { Cycle, CycleContextData } from './types'

import zod from 'zod'

const newCicleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser no máximo 60 minutos.'),
})

export type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>

const CyclesContext = createContext({} as CycleContextData)

export function CyclesProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, () => {
    const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycle-state-1.0.0')

    if (storageStateAsJSON) {
      return JSON.parse(storageStateAsJSON)
    }
  })

  const { cycles, activeCycleId } = cyclesState
  
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    
    return 0
  })

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = Math.floor(currentSeconds % 60)

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const newFormCycle = useForm<NewCicleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  function handleInterruptedCycle() {
    dispatch(interruptedCurrentCycleAction())
  }

  function handleCreateNewCicle(data: NewCicleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
    newFormCycle.reset()
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.set('@ignite-timer:cycle-state-1.0.0', stateJSON)
  }, [cyclesState])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          dispatch(markCurrentCycleAsFinishedAction())

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(
            differenceInSeconds(new Date(), activeCycle.startDate)
          )
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, activeCycleId, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Ignite Timer`
    }
  }, [minutesAmount, minutes, seconds, activeCycle])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        minutes,
        seconds,
        newFormCycle,
        setAmountSecondsPassed,
        handleCreateNewCicle,
        handleInterruptedCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCycles() {
  const context = useContext(CyclesContext)
  return context
}