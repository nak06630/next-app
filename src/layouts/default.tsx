import React from 'react'
import { ReactElement } from 'react'
import { useRouter } from "next/router"
import { useAuthenticator } from '@aws-amplify/ui-react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { AppBar, Toolbar, Drawer, Menu, MenuItem } from '@mui/material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const title = process.env.NEXT_PUBLIC_TITLE

const drawerWidth = 240

export default function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { user, signOut } = useAuthenticator((context: any) => [context.user])

  const itemslist = [
    { text: "Profile", icon: <AccountCircleIcon />, onclick: () => router.push("/accounts/") },
    { text: "Home", icon: <HomeIcon />, onclick: () => router.push("/groups/") },
    { text: "Map", icon: <InfoIcon />, onclick: () => router.push("/map/") },
  ]

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {(
              <div>
                {user.username}
                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={signOut}>Sign out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <List>
            {itemslist.map((item, index) => {
              const { text, icon, onclick } = item
              return (
                <ListItemButton key={text} onClick={onclick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <main>{children}</main>
        </Box>
      </Box>

    </>
  )
}
