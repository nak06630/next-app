import { useState, useEffect } from "react"
import { Container } from '@mui/material'
import { useRecoilState } from "recoil"
import { signupUserState } from '@/store/user'
import CardForgotPassword from '@/components/cardForgotPassword'
import CardConfirmForgotPassword from '@/components/cardConfirmForgotPassword'

export default function SignUp() {
  const [isVerification, setIsVerification] = useState(false)
  // signupの使いまわし
  const [user] = useRecoilState(signupUserState)

  useEffect(() => {
    if (!user) return
    setIsVerification(user.isVerification)
  }, [user])

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      {!isVerification ? (
        <CardForgotPassword />
      ) : (
        <CardConfirmForgotPassword />
      )}
    </Container>
  )
}
