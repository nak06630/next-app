import { useRouter } from "next/router"

export default function App() {
  const router = useRouter()
  router.push("/groups")
  return (
    <main>
    </main>
  )
}
