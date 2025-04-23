import { type AuthenticatedUserT } from '@/lib/classes/Users'
import { api } from '@/lib/utils/api-client'
import { useQuery } from '@tanstack/react-query'

/**
 * 
 * @param props - uid: The user ID to fetch data for.
 * @returns
 * - status: The status of the query (loading, error, or success).
 * - error: Any error that occurred during the query.
 * - memberData: The user data retrieved from the DB.
 */
const useUserUid = (props: { uid: string }) => {
  const { status, data, error } = useQuery<{ data: AuthenticatedUserT }>({
    queryKey: ['userData', props.uid],
    queryFn: () => api.get(`/users/${props.uid}`),
  })

  return { status, error, memberData: data?.data }
}

export default useUserUid
