import { type DatabaseReference, update } from 'firebase/database'
import { FirebaseUtils } from '../firebase/utils'
import { Teams, TeamT } from './Teams'

export type SubscriptionT = {
  teamId: string
  role: 'ADMIN' | 'GUEST'
}

export type AuthenticatedUserT = {
  key?: string
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  subscriptions?: SubscriptionT[]
}

export type UserTeamDataT = SubscriptionT & {
  teamData: TeamT
}

export class Users extends FirebaseUtils {
  protected collection: string = 'users'
  protected dbRef: DatabaseReference = this.createDbRef(this.collection)

  constructor() {
    super()
  }

  get = async (): Promise<AuthenticatedUserT[]> => {
    let s = await this.getSnapshot(this.dbRef)
    let entries = await this.getEntries(s)

    return entries
  }

  findUserByUid = async (
    uid: string
  ): Promise<AuthenticatedUserT | undefined> => {
    let entries = await this.get()
    let user = entries.find((user) => user.uid === uid)

    return user
  }

  create = async (data: AuthenticatedUserT) => {
    await this.pushData(this.dbRef, data)
  }
}

export class User extends Users {
  private userRef: DatabaseReference

  constructor(key: string) {
    super()
    this.userRef = this.createDbRef(`${this.collection}/${key}`)
  }

  getData = async (): Promise<AuthenticatedUserT> => {
    return await this.getSnapshot(this.userRef)
  }

  updateSubscriptions = async (updatedSubscriptions: SubscriptionT[]) => {
    await update(this.userRef, { subscriptions: updatedSubscriptions })
  }

  getTeamDataFromSubscriptions = async (): Promise<UserTeamDataT[]> => {
    const userData = await this.getData()
    const subscriptions = userData.subscriptions

    if (!subscriptions) {
      return []
    }

    const teamsData = subscriptions.map(async (s) => {
      const teamId = s.teamId

      const teamsC = new Teams()
      const teamData = await teamsC.findTeamById(teamId)

      return {
        ...s,
        teamData: teamData,
      }
    })

    return await Promise.all(teamsData) as UserTeamDataT[]
  }
}
