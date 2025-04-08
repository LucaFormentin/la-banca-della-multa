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

  create = async (data: TeamT) => {
    await this.pushData(this.dbRef, data)
  }
}
