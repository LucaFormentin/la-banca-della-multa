import { type TeamMemberT } from '@/lib/classes/Teams'
import classes from './styles.module.css'
import useUserUid from '@/app/hooks/useUserUid'
import Image from 'next/image'
import { Chip, Divider } from '@mui/material'

type Props = {
  member: TeamMemberT
  onTriggerAction: (action: 'PROMOTE' | 'REVOKE') => void
}

const MemberCard = ({ member, ...props }: Props) => {
  const { status, memberData, error } = useUserUid({ uid: member.uid })

  if (status === 'pending') {
    return <li className={classes.member__card}>Loading data...</li>
  }

  if (status === 'error') {
    return <li className='text-red-700 text-sm'>Error: {error?.message}</li>
  }

  return (
    <li className={classes.member__card}>
      <div>
        <div className={classes.member__info}>
          <p>{memberData?.email}</p>
          <p>{memberData?.displayName}</p>
        </div>
        <div className={classes.member__actions}>
          {member.role === 'GUEST' && (
            <button
              className={classes.promote__user__btn}
              onClick={() => props.onTriggerAction('PROMOTE')}
            >
              <Image
                src={'/assets/promote.png'}
                alt='promote-user'
                width={64}
                height={64}
              />
            </button>
          )}
          <button
            className={classes.revoke__access__btn}
            onClick={() => props.onTriggerAction('REVOKE')}
          >
            <Image
              src={'/assets/delete-access.png'}
              alt='revoke-access'
              id='revoke-access'
              width={64}
              height={64}
            />
          </button>
        </div>
      </div>
      <Divider />
      <Chip
        label={member.role}
        color={member.role === 'ADMIN' ? 'success' : 'warning'}
        size='small'
        sx={{
          fontSize: '0.7rem',
        }}
      />
    </li>
  )
}

export default MemberCard
