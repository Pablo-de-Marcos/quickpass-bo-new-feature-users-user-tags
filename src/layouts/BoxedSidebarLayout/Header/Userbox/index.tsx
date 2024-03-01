import { useRef, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemText, Popover, Typography, styled } from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { capitalize as cap } from '@mui/material';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 0.5)};
    height: ${theme.spacing(6)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt="user avatar" src={null} />
        <Box component="span" sx={{ display: { xs: 'none', md: 'inline-block' } }}>
          <UserBoxText>
            <UserBoxLabel variant="body1">{null}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {`${cap(null)} ${cap(null)}`}
            </UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }}/>
        </Box>
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt="user avatar" src={null} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{null}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {`${cap(null)} ${cap(null)}`}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }}/>
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            onClick={() => { handleClose(); }}
            button
            to={`/${location.pathname.split('/')[1]}/management/users/${null}`}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="Perfil" />
          </ListItem>
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }}/>
            {'Cerrar sesión'}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
