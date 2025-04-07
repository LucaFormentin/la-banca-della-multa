import { useAuthCtx } from '@/app/context/auth-context'
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { useState } from 'react'
import classes from './nav.module.css'
import Logout from '@mui/icons-material/Logout';

export type MenuItemT = 'SIGN_OUT'

type Props = {
  onItemClick: (item: MenuItemT) => void
}

const AccountMenu = (props: Props) => {
  const authenticatedUser = useAuthCtx()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const avatar = (
    <Avatar src={authenticatedUser?.photoURL ?? '/assets/user.png'} />
  )

  return (
    <>
      <div className={classes.account__circle__wrapper}>
        <Tooltip title='Account Settings'>
          <IconButton size='small' onClick={handleClick} sx={{ ml: 2 }}>
            {avatar}
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => props.onItemClick('SIGN_OUT')}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
