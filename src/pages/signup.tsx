import { useState, useEffect } from "react"
import { Container } from '@mui/material'
import { useRecoilState } from "recoil"
import { signupUserState } from '@/store/user'
import CardSignUp from '@/components/cardSignUp'
import CardConfirmSignUp from '@/components/cardConfirmSignUp'

export default function SignUp() {
  const [isVerification, setIsVerification] = useState(false)
  const [user] = useRecoilState(signupUserState)

  useEffect(() => {
    if (!user) return
    setIsVerification(user.isVerification)
  }, [user])

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      {!isVerification ? (
        <CardSignUp />
      ) : (
        <CardConfirmSignUp />
      )}
    </Container>
  )
}
