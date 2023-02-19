import { atom } from 'recoil'

type Payload = { email: string }
type IdToken = { jwtToken: string; payload: Payload }
type SignInUserSession = { idToken: IdToken }
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

type signinUser = {
  username: string
  isVerification: boolean
}
export const signinUserState = atom<signinUser | null>({
  key: 'signinUserState',
  default: null,
})

type signupUser = {
  username: string
  isVerification: boolean
}
export const signupUserState = atom<signupUser | null>({
  key: 'signupUserState',
  default: null,
})
