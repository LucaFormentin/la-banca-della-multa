import { DatabaseReference } from 'firebase/database'
import { FirebaseUtils } from '../firebase/utils'

type User = {
  key?: string
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export class Users extends FirebaseUtils {
  private collection: string = 'users'
  private dbRef: DatabaseReference = this.createDbRef(this.collection)

  constructor() {
    super()
  }

  get = async (): Promise<User[]> => {
    let s = await this.getSnapshot(this.dbRef)
    let entries = await this.getEntries(s)

    return entries
  }

  findUserByUid = async (uid: string): Promise<User | undefined> => {
    let entries = await this.get()
    let user = entries.find((user) => user.uid === uid)

    return user
  }

  create = async (data: User) => {
    await this.pushData(this.dbRef, data)
  }
}
