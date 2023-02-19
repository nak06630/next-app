import { useState, useEffect } from "react"
import { Container } from '@mui/material'
import { useRecoilState } from "recoil"
import { signinUserState } from '@/store/user'
import CardSignIn from '@/components/cardSignIn'

export default function Login() {
  const [isVerification, setIsVerification] = useState(true)
  const [user] = useRecoilState(signinUserState)

  useEffect(() => {
    if (!user) return
    setIsVerification(user.isVerification)
  }, [user])

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <CardSignIn />
    </Container>
  )
}
