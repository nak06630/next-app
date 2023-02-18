import { atom } from 'recoil'

type Payload = { email: string }
type IdToken = {
  jwtToken: string
  payload: Payload
}
type SignInUserSession = { idToken: IdToken }
export type CognitoUser = {
  signInUserSession: SignInUserSession
  username: string
  userDataKey: string
  attributes: { sub: string }
  preferredMFA: string
}

const currentUserState = atom<CognitoUser | null>({
  key: 'CognitoUser',
  default: null,
  dangerouslyAllowMutability: true, // https://zenn.dev/sikkim/articles/f63c6f9d365ecf
})

export default currentUserState
