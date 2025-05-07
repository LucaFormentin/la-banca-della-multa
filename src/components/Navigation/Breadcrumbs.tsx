'use client'

import {
  IconClasses,
  IconProps,
  IconTypeMap,
  Breadcrumbs as MuiBreadcrumbs,
  Skeleton,
} from '@mui/material'
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'
import SportsBasketballRoundedIcon from '@mui/icons-material/SportsBasketballRounded'
import { useEffect, useMemo, useState } from 'react'
import { ITEMS } from '../Pages/TeamPage/MenuItems'
import Link from 'next/link'
import { type TeamT } from '@/lib/classes/Teams'
import { emphasize, styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.grey[100], 0.06),
      ...theme.applyStyles('dark', {
        backgroundColor: emphasize(theme.palette.grey[800], 0.06),
      }),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  }
}) as typeof Chip

const Breadcrumbs = () => {
  const layoutSegments = useSelectedLayoutSegments()
  const params = useParams()
  const pathname = usePathname()
  const [teamName, setTeamName] = useState<string>('')

  useEffect(() => {
    if (!params.team_id) return

    const fetchTeamData = async () => {
      try {
        const res = await fetch(`/api/teams/${params.team_id}/get-info`, {
          method: 'GET',
        })

        if (!res.ok) throw new Error('Failed to fetch team data')

        const data = await res.json()
        const teamData = data.data as TeamT

        setTeamName(teamData.name)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchTeamData()
  }, [params])

  const breadcrumbs = useMemo(() => {
    // remove authenticated user id from the segments
    const segments = layoutSegments.filter((s) => s !== params.uid)

    // href always starts with the authenticated user id
    const baseHref = `/${params.uid}`

    // init breadcrumbs array with the landing page obj
    const breadcrumbsArr: { label: string; href: string; icon?: any }[] = [
      {
        label: 'Teams',
        href: `${baseHref}/landing`,
        icon: <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />,
      },
    ]

    segments.forEach((s) => {
      // first segment
      if (s === 'landing' || s === 'teams') return

      // check if the segment is a team id
      if (s === params.team_id) {
        breadcrumbsArr.push({
          label: teamName,
          href: `${baseHref}/teams/${s}`,
          icon: (
            <SportsBasketballRoundedIcon sx={{ mr: 0.5 }} fontSize='inherit' />
          ),
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
        {breadcrumbs.map((segment, index) => {
          let isActive = segment.href === pathname

          return (
            <StyledBreadcrumb
              key={index}
              component={Link}
              href={segment.href}
              label={
                segment.label || (
                  <Skeleton
                    variant='text'
                    sx={{ fontSize: '1rem' }}
                    width={80}
                  />
                )
              }
              icon={segment.icon}
              sx={{
                color: isActive ? 'white' : 'inherit',
                backgroundColor: (theme) =>
                  isActive ? '#2196f3' : theme.palette.grey[700],
              }}
            />
          )
        })}
      </MuiBreadcrumbs>
    </>
  )
}

export default Breadcrumbs
