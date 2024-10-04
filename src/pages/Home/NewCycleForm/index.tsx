import { useCycles } from '../../../contexts/Cycles'
import {
  FormContainer,
  MinutesAmountInput,
  TaskInput
} from './styles'

export function NewCycleForm() {
  const { newFormCycle, activeCycle } = useCycles()
  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...newFormCycle.register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        min={5}
        max={60}
        step={5}
        disabled={!!activeCycle}
        {...newFormCycle.register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}