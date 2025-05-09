import { type RosterMember as RosterMemberT } from '@/lib/classes/Teams'
import RosterCard from '../TeamManagerPage/RosterCard'
import { IconButton } from '@mui/material'
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  GavelRounded,
} from '@mui/icons-material'
import { useState } from 'react'
import Link from 'next/link'
import MemberHistory from './MemberHistory'
import { useParams } from 'next/navigation'

type Props = {
  isAlphaUser: boolean
  data: RosterMemberT<'PLAYER' | 'STAFF'>
}

const RosterMember = ({ isAlphaUser, data }: Props) => {
  const [openHistory, setOpenHistory] = useState(false)
  const params = useParams()

  return (
    <div key={data.id} className='flex flex-col gap-1'>
      <RosterCard data={data}>
        <div className='flex ml-auto items-center'>
          {isAlphaUser && (
            <IconButton
              LinkComponent={Link}
              href={`/${params.uid}/teams/${params.team_id}/fines/add-fine?memberId=${data.id}`}
            >
              <GavelRounded />
            </IconButton>
          )}
          <IconButton size='small' onClick={() => setOpenHistory(!openHistory)}>
            {openHistory ? (
              <KeyboardArrowUpRounded />
            ) : (
              <KeyboardArrowDownRounded />
            )}
          </IconButton>
        </div>
      </RosterCard>
      {openHistory && <MemberHistory fines={data.fines ?? []} />}
    </div>
  )
}

export default RosterMember
