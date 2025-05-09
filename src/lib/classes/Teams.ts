import { update, type DatabaseReference } from 'firebase/database'
import { FirebaseUtils } from '../firebase/utils'

export type TeamMemberT = {
  uid: string
  role: 'SUPER' | 'ADMIN' | 'GUEST'
}

export type RosterMemberTypes = 'PLAYER' | 'STAFF'

export type PlayerT = {
  id: string
  lastName: string
  firstName: string
  number: number
  role: 'PLAY' | 'GUARDIA' | 'ALA' | 'CENTRO'
  fines?: FineT[]
}

export type StaffT = {
  id: string
  lastName: string
  firstName: string
  role: 'COACH' | 'ASSISTENTE' | 'DIRIGENTE'
  fines?: FineT[]
}

export type RosterMember<T extends RosterMemberTypes> = T extends 'PLAYER'
  ? PlayerT
  : StaffT

export type TeamT = {
  key?: string
  id: string
  createdAt: string
  name: string
  location?: string
  color: string
  logo?: string
  members: TeamMemberT[]
  roster?: {
    players: RosterMember<'PLAYER'>[]
    staff: RosterMember<'STAFF'>[]
  }
  fines?: FineT[]
}

export type FineT = {
  id: string
  name: string
  amount: number
}

export class Teams extends FirebaseUtils {
  protected collection: string = 'teams'
  protected dbRef: DatabaseReference = this.createDbRef(this.collection)

  constructor() {
    super()
  }

  get = async (): Promise<TeamT[]> => {
    let s = await this.getSnapshot(this.dbRef)
    let entries = await this.getEntries(s)

    return entries
  }

  create = async (data: TeamT) => {
    await this.pushData(this.dbRef, data)
  }

  findTeamById = async (teamId: string): Promise<TeamT | undefined> => {
    let entries = await this.get()
    let team = entries.find((team) => team.id === teamId)

    return team
  }
}

export class Team extends Teams {
  private teamRef: DatabaseReference

  constructor(key: string) {
    super()
    this.teamRef = this.createDbRef(`${this.collection}/${key}`)
  }

  getData = async (): Promise<TeamT> => {
    return await this.getSnapshot(this.teamRef)
  }

  updateMembers = async (updatedMembers: TeamMemberT[]) => {
    await update(this.teamRef, { members: updatedMembers })
  }

  addPlayerToRoster = async (updatedPlayers: RosterMember<'PLAYER'>[]) => {
    await update(this.teamRef, { 'roster/players': updatedPlayers })
  }

  addStaffToRoster = async (updatedStaff: RosterMember<'STAFF'>[]) => {
    await update(this.teamRef, { 'roster/staff': updatedStaff })
  }

  addFine = async (updatedFines: FineT[]) => {
    await update(this.teamRef, { fines: updatedFines })
  }

  addFineToRosterMember = async (memberId: string, fineId: string) => {
    let t = await this.getData()
    let roster = [...(t.roster?.players || []), ...(t.roster?.staff || [])]

    let fines = t.fines || []
    let fineData = fines.find((f) => f.id === fineId)

    roster.forEach(async (i) => {
      if (i.id === memberId) {
        let isPlayer = 'number' in i
        let currentFines = i.fines || []
        
        let updatedFines = [...currentFines, fineData]
        
        if (isPlayer) {
          let index = t.roster?.players.findIndex((r) => r.id === memberId)
          await update(this.teamRef, { [`roster/players/${index}/fines`]: updatedFines })
        } else {
          let index = t.roster?.staff.findIndex((r) => r.id === memberId)
          await update(this.teamRef, { [`roster/staff/${index}/fines`]: updatedFines })
        }
      }
    })
  }
}
