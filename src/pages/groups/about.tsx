import React from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import Paper from '@mui/material/Paper'

interface Todo {
  id: string
  userId: string
  title: string
}
interface Todos {
  todos: Todo[]
}

export default function Groups({ todos }: Todos) {
  // hook below is only reevaluated when `user` changes
  const { user } = useAuthenticator((context: any) => [context.user])

  return (
    <>
      <h1>Todos</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>userId</TableCell>
              <TableCell>title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{todo.userId}</TableCell>
                <TableCell>{todo.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  return { props: { todos: data } }
}
