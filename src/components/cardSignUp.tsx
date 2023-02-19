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
  name: yup
    .string()
    .required('必須です'),
  password: yup
    .string()
    .required('必須です')
    .matches(
      /^(?=.*[!-/:-@[-`{-~])(?=.*[0-9])(?=.*[a-z])[!-~]{8,}$/,
      'パスワードを入力してください'
    ),
})

export default function CardSignUp() {
  const router = useRouter()
  const [user, setSignupUserState] = useRecoilState(signupUserState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<SampleFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<SampleFormInput> = async (data) => {
    const username = data.email
    const password = data.password
    const email = data.email
    const name = data.name
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name
        }
      })
      setSignupUserState({ username: username, isVerification: true })
    } catch (error: any) {
      setIsAlert(true)
      switch (error.code) {
        case 'UsernameExistsException':
          setError('既にユーザーが存在します。')
          break
        case 'InvalidPasswordException':
        case 'InvalidParameterException':
        default:
          setError('Unauthorized: ' + error.code + ' : ' + error.message)
      }
    }
  }


  return (
    <Card>
      {isAlert && <Alert severity="error" onClose={() => { setIsAlert(false) }}>{error}</Alert>}
      <CardHeader title="サインアップ"></CardHeader>
      <CardContent>
        <Stack spacing={3}>
          <TextField required label="メールアドレス" type="email"
            {...register('email')}
            error={'email' in errors}
            helperText={errors.email?.message}
          />
          <TextField required label="パスワード" type="password"
            {...register('password')}
            error={'password' in errors}
            helperText={errors.password?.message}
          />
          <TextField required label="名前" type="name"
            {...register('name')}
            error={'name' in errors}
            helperText={errors.name?.message}
          />
          <Button color="primary" variant="contained" size="large"
            onClick={handleSubmit(onSubmit)}
          >
            ログイン
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
