import { useRecoilState } from "recoil"
import { currentUserState } from '@/store/user'

export default function Profile() {
  // hook below is only reevaluated when `user` changes
  const [user] = useRecoilState(currentUserState)

  if (!user) return <div>Error</div>
  return (
    <>
      <pre>user.username = {JSON.stringify(user.username, null, 2)}</pre>
      <pre>user.signInUserSession = {JSON.stringify(user.signInUserSession, null, 2)}</pre>
      <pre>user.attributes = {JSON.stringify(user.attributes, null, 2)}</pre>
      <pre>user.preferredMFA = {JSON.stringify(user.preferredMFA, null, 2)}</pre>
    </>
  )
}
