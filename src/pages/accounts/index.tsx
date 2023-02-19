import { useRecoilState } from "recoil"
import { currentUserState } from '@/store/user'
import DialogMFASetup from '@/components/dialogMFASetup'
import { Card, CardContent, CardHeader, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid'
import { useState, useCallback } from "react"

export default function Profile() {
  const [user] = useRecoilState(currentUserState)
  const [mfa, setMFA] = useState(false)
  if (!user) return <div>Error</div>

  // アイコンをクリックしたときの処理
  const handleDetailClick = useCallback(
    (params: GridRowParams) => (event: { stopPropagation: () => void }) => {
      event.stopPropagation()
      if (params.row.key == 'MFA') setMFA(true)
      console.log(`handleDetailClick=${JSON.stringify(params.row, null, 2)}`)
      console.log(mfa)
    },
    []
  )

  // 表示するアクションを返す関数です
  const getDetailAction = useCallback(
    (params: GridRowParams) => [
      <GridActionsCellItem
        icon={params.row.action ? <EditIcon /> : <></>}
        onClick={handleDetailClick(params)}
        color="inherit"
        key={params.id}
      />
    ],
    [handleDetailClick]
  )

  const columns: GridColDef[] = [
    { field: 'key', headerName: 'key', width: 200 },
    { field: 'val', headerName: 'value', width: 500 },
    { field: 'actions', headerName: 'action', type: 'actions', getActions: getDetailAction },
  ]
  const payload = user.signInUserSession.idToken.payload
  const rows: GridRowsProp = [
    { id: 1, key: 'Username', val: user.username, action: false },
    { id: 2, key: 'Sub', val: payload.sub, action: false },
    { id: 3, key: 'Name', val: payload.name, action: false },
    { id: 4, key: 'Email', val: payload.email, action: false },
    { id: 5, key: 'auth_time', val: (new Date(payload.auth_time * 1000).toLocaleString()), action: false },
    { id: 6, key: 'iat', val: (new Date(payload.iat * 1000).toLocaleString()), action: false },
    { id: 7, key: 'exp', val: (new Date(payload.exp * 1000).toLocaleString()), action: false },
    { id: 8, key: 'MFA', val: user.preferredMFA === 'SOFTWARE_TOKEN_MFA', action: true },
  ]

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 5 }}>

        <Card>
          <CardHeader title="ログイン"></CardHeader>
          <CardContent>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                density="compact"
                autoHeight
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="ログイン"></CardHeader>
          <CardContent>
            <pre>user.username = {JSON.stringify(user.username, null, 2)}</pre>
            <pre>user.signInUserSession = {JSON.stringify(user.signInUserSession, null, 2)}</pre>
            <pre>user.attributes = {JSON.stringify(user.attributes, null, 2)}</pre>
            <pre>user.preferredMFA = {JSON.stringify(user.preferredMFA, null, 2)}</pre>
          </CardContent>
        </Card>
        {<DialogMFASetup open={mfa} onClose={() => setMFA(false)} />}
      </Container>
    </>
  )
}
