import { UseFormReturn } from 'react-hook-form'
import { NewCicleFormData } from '.'

export interface CycleContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  cycles: Cycle[]
  minutes: string
  seconds: string
  newFormCycle: UseFormReturn<NewCicleFormData, any, undefined>
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
  handleCreateNewCicle: (data: NewCicleFormData) => void
  handleInterruptedCycle: () => void
}

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}