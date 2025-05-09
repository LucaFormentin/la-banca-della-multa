import Dialog from '@/components/Templates/Dialog'
import { Teams } from '@/lib/classes/Teams'
import FineList from './FineList'

const AddFineModalPage = async ({
  params,
}: {
  params: Promise<{ team_id: string }>
}) => {
  const { team_id } = await params

  const teamsC = new Teams()
  const teamData = await teamsC.findTeamById(team_id)

  if (!teamData) {
    return <p>Team not found...</p>
  }

  return (
    <Dialog title='Aggiungi Multa'>
      {teamData.fines ? (
        <FineList teamId={team_id} fines={teamData.fines} />
      ) : (
        <p>No fines yet.</p>
      )}
    </Dialog>
  )
}

export default AddFineModalPage
