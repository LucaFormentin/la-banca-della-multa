'use client'

import { useTeamCtx } from '@/app/context/team-context'
import { useState } from 'react'
import NewRosterMemberForm, { type MemberDataT } from './NewRosterMemberForm'
import { api } from '@/lib/utils/api-client'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const NewRosterMemberCreation = ({ teamId }: { teamId: string }) => {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  const updateRoster = (data: MemberDataT) => {
    api
      .post(`/teams/${teamId}/add-to-roster`, data)
      .catch((err) => {
        toast.error(err)
      })
      .finally(() => {
        router.refresh()
        setShowForm(false)
        toast.success('Roster updated successfully!')
      })
  }

  return (
    <div className='flex flex-col gap-1'>
      <button
        className='rounded-xl border-2 border-white/[.145] p-2 w-full'
        onClick={() => setShowForm(!showForm)}
      >
        Update Roster
      </button>
      {showForm && <NewRosterMemberForm onFormSubmit={updateRoster} />}
    </div>
  )
}

const TeamManager = () => {
  const { teamData } = useTeamCtx()

  const isRosterEmpty =
    !teamData.roster ||
    (teamData.roster.players?.length === 0 &&
      teamData.roster.staff?.length === 0)

  if (isRosterEmpty) {
    return (
      <>
        <p>Roster is currently empty.</p>
        <NewRosterMemberCreation teamId={teamData.id} />
      </>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <NewRosterMemberCreation teamId={teamData.id} />
      <ul className='flex flex-col gap-2'>
        {teamData.roster?.players?.map((player, index) => (
          <li key={index}>{player.lastName}</li>
        ))}
      </ul>
      <ul className='flex flex-col gap-2'>
        {teamData.roster?.staff?.map((staff, index) => (
          <li key={index}>{staff.lastName}</li>
        ))}
      </ul>
    </div>
  )
}

export default TeamManager
