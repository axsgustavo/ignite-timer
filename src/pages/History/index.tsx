import { HistoryContainer, HistoryList, Status } from "./styles"
import { useCycles } from "../../contexts/Cycles"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function History () {
  const { cycles } = useCycles()


  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>
          <tbody>
            {cycles.map(cycle =>
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} mintuos</td>
                <td>{formatDistanceToNow(new Date(cycle.startDate), {
                  addSuffix: true,
                  locale: ptBR
                })}</td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}