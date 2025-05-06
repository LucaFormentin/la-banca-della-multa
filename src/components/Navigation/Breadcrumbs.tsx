'use client'

import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material'
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'
import { useEffect, useMemo, useState } from 'react'
import { ITEMS } from '../Pages/TeamPage/MenuItems'
import Link from 'next/link'
import { type TeamT } from '@/lib/classes/Teams'
import { api } from '@/lib/utils/api-client'

const Breadcrumbs = () => {
  const layoutSegments = useSelectedLayoutSegments()
  const params = useParams()
  const pathname = usePathname()
  const [teamName, setTeamName] = useState<string>('')

  useEffect(() => {
    if ('team_id' in params) {
      api.get(`/teams/${params.team_id}/get-info`).then((data: any) => {
        let teamData = data.data as TeamT

        setTeamName(teamData.name)
      })
    }
  }, [params])

  const breadcrumbs = useMemo(() => {
    // remove authenticated user id from the segments
    const segments = layoutSegments.filter((s) => s !== params.uid)

    // href always starts with the authenticated user id
    const baseHref = `/${params.uid}`

    // init breadcrumbs array with the landing page obj
    const breadcrumbsArr: { label: string; href: string }[] = [
      { label: 'Teams', href: `${baseHref}/landing` },
    ]

    segments.forEach((s) => {
      // first segment
      if (s === 'landing' || s === 'teams') return

      // check if the segment is a team id
      if (s === params.team_id) {
        breadcrumbsArr.push({
          label: teamName,
          href: `${baseHref}/teams/${s}`,
        })
      }

      // check if the segment is a team page
      let segmentMatch = ITEMS.find((item) => item.href === `/${s}`)

      if (segmentMatch) {
        breadcrumbsArr.push({
          label: segmentMatch.title,
          href: `${baseHref}/teams/${params.team_id}/${s}`,
        })
      }
    })

    return breadcrumbsArr
  }, [layoutSegments, teamName])

  return (
    <>
      <MuiBreadcrumbs sx={{ p: '0.5rem' }}>
        {breadcrumbs.map((segment, index) => (
          <Link
            key={index}
            className='flex items-center'
            href={segment.href}
            style={{ color: segment.href === pathname ? '#2196f3' : 'inherit' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
            {segment.label}
          </Link>
        ))}
      </MuiBreadcrumbs>
    </>
  )
}

export default Breadcrumbs
