import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { useRecoilState } from "recoil"
import { currentUserState } from '@/store/user'

interface User {
  id: string
  name: string
  email: string
}
interface Users {
  users: User[]
}

export default function Groups({ users }: Users) {
  // hook below is only reevaluated when `user` changes
  const [user] = useRecoilState(currentUserState)

  return (
    <>
      <h1>Hello {user?.signInUserSession.idToken.payload.email}</h1>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()
  return { props: { users: data } }
}
