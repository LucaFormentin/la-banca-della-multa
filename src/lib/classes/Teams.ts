import { type DatabaseReference } from 'firebase/database'
import { FirebaseUtils } from '../firebase/utils'

type TeamMemberT = {
  uid: string
  role: 'ADMIN' | 'GUEST'
}

export type TeamT = {
  id: string
  createdAt: string
  name: string
  location?: string
  color: string
  logo?: string
  members: TeamMemberT[]
}

export class Teams extends FirebaseUtils {
  private collection: string = 'teams'
  private dbRef: DatabaseReference = this.createDbRef(this.collection)

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
