import { type FineT } from '@/lib/classes/Teams'

type Props = {
  fines: FineT[]
}

const MemberHistory = ({ fines }: Props) => {
  return (
    <div className='border'>
      {fines.length === 0 ? (
        <p>No fines yet.</p>
      ) : (
        fines.map((fine) => <li key={`${fine.id}__${Math.random()}`}>{fine.name}</li>)
      )}
    </div>
  )
}

export default MemberHistory
