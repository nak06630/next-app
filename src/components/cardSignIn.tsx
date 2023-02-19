import { useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { Alert, Button, Card, CardHeader, CardContent, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'
import { useRecoilState } from "recoil"
import { currentUserState } from '@/store/user'

Auth.configure(awsconfig)

interface SampleFormInput {
  email: string
  name: string
  password: string
}

const schema = yup.object({
  email: yup
    .string()
    .required('必須です')
    .email('メールアドレス形式で入力してください'),
  password: yup
    .string()
    .required('必須です')
    .matches(
      /^(?=.*[!-/:-@[-`{-~])(?=.*[0-9])(?=.*[a-z])[!-~]{8,}$/,
      'パスワードを入力してください'
    ),
})

export default function SignIn() {
  const router = useRouter()
  const [user, setUser] = useRecoilState(currentUserState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<SampleFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<SampleFormInput> = async (data) => {
    try {
      const user = await Auth.signIn(data.email, data.password)
      setUser(user)
      router.push("/groups/")
    } catch (error: any) {
      setIsAlert(true)
      switch (error.code) {
        case 'UserNotFoundException':
        case 'NotAuthorizedException':
          setError('ユーザー名またはパスワードが違います。')
          break
        default:
          setError('Unauthorized: ' + error.code + ' : ' + error.message)
      }
    }
  }

  return (
    <Card>
      {isAlert && <Alert severity="error" onClose={() => { setIsAlert(false) }}>{error}</Alert>}
      <CardHeader title="ログイン"></CardHeader>
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
          <Button color="primary" variant="contained" size="large"
            onClick={handleSubmit(onSubmit)}
          >
            ログイン
          </Button>
        </Stack>
        <Link href="/signup">signup</Link>
      </CardContent>
    </Card>
  )
}
