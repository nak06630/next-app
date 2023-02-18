import { useRouter } from "next/router"
import { Button, Container, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'
import { useRecoilState } from "recoil"
import currentUserState from '@/store/user'

Auth.configure(awsconfig)

interface SampleFormInput {
  email: string
  name: string
  password: string
}

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required('必須だよ')
    .email('正しいメールアドレス入力してね'),
  password: yup
    .string()
    .required('必須だよ')
    .min(6, '少ないよ')
  /*
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      'パスワード弱いよ'
    ),
  */
})

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useRecoilState(currentUserState)

  //https://dev.classmethod.jp/articles/mui-v5-rhf-v7/
  const { register, handleSubmit, formState: { errors } } = useForm<SampleFormInput>({
    resolver: yupResolver(schema)
  })

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<SampleFormInput> = async (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data)
    try {
      const user = await Auth.signIn(data.email, data.password)
      console.log(user)
      setUser(user)
      router.push("/groups/")
    } catch (error) {
      console.log("Unauthorized", data, error)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <TextField
          required
          label="メールアドレス"
          type="email"
          {...register('email')}
          error={'email' in errors}
          helperText={errors.email?.message}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          {...register('password')}
          error={'password' in errors}
          helperText={errors.password?.message}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          ログイン
        </Button>
      </Stack>
    </Container>
  )
}
