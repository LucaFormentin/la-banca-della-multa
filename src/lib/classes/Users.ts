import { DatabaseReference } from 'firebase/database'
import { FirebaseUtils } from '../firebase/utils'

type User = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export class Users extends FirebaseUtils {
  protected collection: string = 'users'
  protected dbRef: DatabaseReference = this.createDbRef(this.collection)

  constructor() {
    super()
  }

  create = async (data: User) => {
    await this.pushData(this.dbRef, data)
  }
}
