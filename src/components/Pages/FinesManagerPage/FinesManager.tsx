'use client'

import { useTeamCtx } from '@/app/context/team-context'
import { api } from '@/lib/utils/api-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import NewFineForm from './NewFineForm'
import { type FineT } from '@/lib/classes/Teams'

const NewFineCreation = ({ teamId }: { teamId: string }) => {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  const updateFineList = (fineData: FineT) => {
    api
      .post(`/teams/${teamId}/add-fine`, fineData)
      .catch((err) => {
        toast.error(err)
      })
      .finally(() => {
        router.refresh()
        setShowForm(false)
        toast.success('Fine list updated successfully!')
      })
  }

  return (
    <div className='flex flex-col gap-1'>
      <button
        className='rounded-xl border-2 border-white/[.145] p-2 w-full'
        onClick={() => setShowForm(!showForm)}
      >
        Update Fine List
      </button>
      {showForm && <NewFineForm onFormSubmit={updateFineList} />}
    </div>
  )
}

const FinesManager = () => {
  const { teamData } = useTeamCtx()

  if (!teamData.fines || teamData.fines.length === 0) {
    return (
      <>
        <p>No fines created yet.</p>
        <NewFineCreation teamId={teamData.id} />
      </>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <NewFineCreation teamId={teamData.id} />
      <ul className=' flex flex-col gap-2 w-full p-4'>
        {teamData.fines?.map((f) => (
          <li key={f.id} className='rounded-lg bg-white/[.145] p-2 flex gap-4'> 
            {f.name} - {f.amount}€
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FinesManager
