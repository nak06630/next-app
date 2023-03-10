import React, { useState } from "react"
import { useRouter } from "next/router"
import { Alert, Button, Card, CardHeader, CardContent, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'
import { useRecoilState } from "recoil"
import { signupUserState } from '@/store/user'

Auth.configure(awsconfig)

interface SampleFormInput {
  username: string
  email: string
  name: string
  password: string
}

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required('必須です')
    .email('メールアドレス形式で入力してください'),
})

export default function CardForgotPassword() {
  const router = useRouter()
  const [user, setSignupUserState] = useRecoilState(signupUserState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<SampleFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<SampleFormInput> = async (data) => {
    const username = data.email
    try {
      const user = await Auth.forgotPassword(username)
      setSignupUserState({ username: username, isVerification: true })
    } catch (error: any) {
      setIsAlert(true)
      switch (error.code) {
        default:
          setError('Unauthorized: ' + error.code + ' : ' + error.message)
      }
    }
  }


  return (
    <Card>
      {isAlert && <Alert severity="error" onClose={() => { setIsAlert(false) }}>{error}</Alert>}
      <CardHeader title="パスワード再発行"></CardHeader>
      <CardContent>
        <Stack spacing={3}>
          <TextField required label="メールアドレス" type="email"
            {...register('email')}
            error={'email' in errors}
            helperText={errors.email?.message}
          />
          <Button color="primary" variant="contained" size="large"
            onClick={handleSubmit(onSubmit)}
          >
            送信
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
