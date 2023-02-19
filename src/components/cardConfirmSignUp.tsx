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

interface FormInput {
  code: string
}

const schema = yup.object({
  code: yup
    .string()
    .required('必須です'),
})

export default function CardConfirmSignUp() {
  const router = useRouter()
  const [user, setSignupUserState] = useRecoilState(signupUserState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!user) return
    const username = user.username
    const code = data.code
    try {
      await Auth.confirmSignUp(username, code)
      setSignupUserState({ username: username, isVerification: true })
      router.push('/')
    } catch (error: any) {
      setIsAlert(true)
      switch (error.code) {
        case 'CodeMismatchException':
          setError('無効なコードが入力されました。')
          break
        case 'LimitExceededException':
          setError('しばらく待ってから再登録してください。')
          break
        case 'ExpiredCodeException':
          setError('コードは無効です。')
          break
        case 'NotAuthorizedException':
        case 'CodeDeliveryFailureException':
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
          <TextField disabled value={user?.username} />
          <TextField required label="検証コード" type="code"
            {...register('code')}
            error={'code' in errors}
            helperText={errors.code?.message}
          />
          <Button color="primary" variant="contained" size="large"
            onClick={handleSubmit(onSubmit)}
          >
            登録
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
