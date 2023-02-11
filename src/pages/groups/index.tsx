import React from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'

export default function Groups() {
  // hook below is only reevaluated when `user` changes
  const { user } = useAuthenticator((context: any) => [context.user])
  return (
    <>
      <h1>Hello {user.username}</h1>
    </>
  )
}
