import Router from "next/router"
import { useRecoilState } from "recoil"
import currentUserState from "@/store/user"

export const ProtectRoute = async ({ children }: any) => {
  const [user] = useRecoilState(currentUserState)
  if (!user || !user.signInUserSession) {
    if (typeof window !== "undefined") {
      Router.push("/")
    }
  }
  return children
}
