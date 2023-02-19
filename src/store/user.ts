import { atom } from 'recoil'

// CognitoUser
type Payload = {
  sub: string
  'cognito:username': string
  name: string
  email: string
  email_verified: boolean
  phone_number: string
  auth_time: number
  iat: number
  exp: number
}
type IdToken = {
  jwtToken: string
  payload: Payload
}
type SignInUserSession = {
  idToken: IdToken
}
type CognitoUser = {
  signInUserSession: SignInUserSession
  username: string
  userDataKey: string
  attributes: { sub: string }
  preferredMFA: string
}
export const currentUserState = atom<CognitoUser | null>({
  key: 'CognitoUser',
  default: null,
  dangerouslyAllowMutability: true, // https://zenn.dev/sikkim/articles/f63c6f9d365ecf
})

// signin
type signinUser = {
  username: string
  isVerification: boolean
}
export const signinUserState = atom<signinUser | null>({
  key: 'signinUserState',
  default: null,
})

// signup
type signupUser = {
  username: string
  isVerification: boolean
}
export const signupUserState = atom<signupUser | null>({
  key: 'signupUserState',
  default: null,
})
