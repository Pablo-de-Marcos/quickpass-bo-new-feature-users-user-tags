import {
  FC,
  ChangeEvent,
  useState,
  ReactElement,
  Ref,
  forwardRef,
  useEffect
} from 'react';
import {
  Avatar,
  Box,
  Slide,
  Card,
  Tooltip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  TableRow,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Zoom,
  styled,
  Autocomplete,
  Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import type { User } from 'src/models/user';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar, VariantType } from 'notistack';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import LoyaltyRoundedIcon from '@mui/icons-material/LoyaltyRounded';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import StarIcon from '@mui/icons-material/Star';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-paper {
      overflow: visible;
    }
  `
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
    background-color: ${theme.colors.error.lighter};
    color: ${theme.colors.error.main};
    width: ${theme.spacing(12)};
    height: ${theme.spacing(12)};
    .MuiSvgIcon-root {
      font-size: ${theme.typography.pxToRem(45)};
    }
  `
);

const ButtonError = styled(Button)(
  ({ theme }) => `
    background: ${theme.colors.error.main};
    color: ${theme.palette.error.contrastText};
    &:hover {
      background: ${theme.colors.error.dark};
    }
  `
);

const fetchRedimidoresDummy = [
  {
    rolUsers: [
      {
        proLastName: 'mailinator ',
        id: 'TxgNazPbmCOc3TzrsFWSj2tmnvJ2',
        proName: 'guardia',
        proEmail: 'guardia@mailinator.com'
      }
    ],
    rolDesc: 'Guardia que redime solo entradas',
    rolPermissions: [
      {
        id: 'Combo',
        label: 'Control Combo',
        selected: true
      },
      {
        id: 'Entrada',
        label: 'Control Entrada',
        selected: true
      },
      {
        label: 'Control Ticket',
        id: 'Ticket',
        selected: true
      }
    ],
    rolPlaces: [
      {
        plcAddress:
          'Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina',
        plcCoordinates: {
          _longitude: -64.46538029999999,
          _latitude: -31.4024536
        },
        id: 'lMT7mH5IqQ6ZtRQtWWkF',
        plcName: 'Keops'
      }
    ],
    rolName: 'Guardia de Entradas',
    id: 'aMLCVQrF91ZOa5HSEH2A'
  }
];

const fetchTagsDummy = [
  {
    isTagVisible: true,
    tagColor: '#000000',
    tagName: 'MARZO',
    id: '0sr2T13LLgSv70vH3KF6'
  },
  {
    isTagVisible: false,
    tagColor: '#1fe022',
    tagName: 'MALE',
    id: '8HHBLP2OIpFaL36sK5uF'
  },
  {
    isTagVisible: false,
    tagColor: '#1fe022',
    tagName: 'AGOSTO',
    id: 'btj2McNknlZ3Rr68aeaP'
  },
  {
    isTagVisible: false,
    tagColor: '#9f2828',
    tagName: 'SEPTEIMBRE',
    id: 'cRUSu1PtyY8HUkQNOKfY'
  },
  {
    isTagVisible: false,
    tagColor: '#1fe022',
    tagName: 'OCTUBRE',
    id: 'iw4bQQPJNrm68Gnv2txi'
  },
  {
    isTagVisible: true,
    tagColor: '#e4c70c',
    tagName: 'VIP',
    id: 'v2UW8fXRZhMlKgKAGRHf'
  },
  {
    isTagVisible: true,
    tagColor: '#1fe022',
    tagName: 'VERIFICADO',
    id: 'vljlZ38kV0qalFulP3Ax'
  },
  {
    isTagVisible: false,
    tagColor: '#1fe022',
    tagName: 'ABRIL',
    id: 'xVqMhLkz3iy3M5A8vKz7'
  }
];

const fetchRolesDummy = [
  {
    id: 'Admin'
  },
  {
    id: 'Default'
  },
  {
    id: 'Productor'
  },
  {
    id: 'Redimidor'
  },
  {
    id: 'Rrpp'
  },
  {
    id: 'SuperAdmin'
  }
];

interface ResultsProps {
  users: User[];
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (users: User[], query: string): User[] => {
  return users.filter((user) => {
    let matches = true;
    if (query) {
      const properties = [
        'proEmail',
        'proName',
        'proLastName',
        'proDNI',
        'proPhone'
      ];
      let containsQuery = false;
      properties.forEach((property) => {
        if (
          user[property] != null &&
          user[property].toLowerCase().includes(query.toLowerCase())
        ) {
          containsQuery = true;
        }
      });
      if (!containsQuery) {
        matches = false;
      }
    }
    return matches;
  });
};

const applyPagination = (
  users: User[],
  page: number,
  limit: number
): User[] => {
  return users.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ users, refresh }) => {
  const [selectedUser, setSelectedUser] = useState<User>(null);
  const { t }: { t: any } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [openAddTagModal, setOpenAddTagModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [newTagColor, setNewTagColor] = useState('#000000');
  const [newTagVisible, setNewTagVisible] = useState(true);

  const handleQueryChange = (user: ChangeEvent<HTMLInputElement>): void => {
    user.persist();
    setQuery(user.target.value);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(users, query);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);

  useEffect(() => {
    if (paginatedUsers.length === 0) {
      setPage(0);
    }
  }, [isDeleted, paginatedUsers]);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = async () => {
    setOpenConfirmDelete(false);
    /* try {
      await axiosCreate.delete(`users/${selectedUser.id}`);
      refresh((prevState) => !prevState);
      handleSnackBar('El usuario se eliminó exitosamente', 'success');
      setIsDeleted((prevState) => !prevState);
    } catch (error) {
      handleSnackBar('El usuario no pudo ser eliminado', 'error');
    } */

    refresh((prevState) => !prevState);
    handleSnackBar('El usuario se eliminó exitosamente', 'success');
    setIsDeleted((prevState) => !prevState);
  };

  const handleSnackBar = (msg: string, type: VariantType) => {
    enqueueSnackbar(msg, {
      variant: type,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      TransitionComponent: Zoom
    });
  };

  const [tagValue, setTagValue] = useState(null);

  const handleTagOnChange = (event, newValue) => {
    if (newValue.some((tag) => tag.id === 'addTag')) {
      return;
    }
    setSelectedTags(newValue);
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag.id !== tagToRemove.id)
    );
  };

  const resetModalValues = () => {
    setNewTagName('');
    setNewTagColor('#000000');
    setNewTagVisible(true);
  };

  const handleAddTag = () => {
    resetModalValues();
    setOpenAddTagModal(true);
  };

  const handleCloseAddTagModal = () => {
    setOpenAddTagModal(false);
    resetModalValues();
  };

  // const enviarNuevoTag = async (nuevoTag) => {
  //   try {
  //     const response = await axios.post('url_del_endpoint', nuevoTag);
  //     if (response.status === 200) {
  //     } else {
  //       console.error('Hubo un problema al crear el nuevo tag:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error al crear el nuevo tag:', error.message);
  //   }
  // };

  const handleAddNewTag = () => {
    if (newTagName.trim() === '') {
      handleSnackBar('El nombre del tag no puede estar vacío', 'error');
      return;
    }

    const tagExistsInDummy = fetchTagsDummy.some(
      (tag) => tag.tagName === newTagName
    );
    const tagExistsInSelectedTags = selectedTags.some(
      (tag) => tag.tagName === newTagName
    );

    if (tagExistsInDummy || tagExistsInSelectedTags) {
      handleSnackBar('El tag ya existe', 'error');
      return;
    }

    const hexColor = convertColorToHex(newTagColor);

    const newTag = {
      tagName: newTagName,
      tagColor: hexColor,
      isTagVisible: newTagVisible,
      id: Math.random().toString(36).substr(2, 9)
    };
    //enviarNuevoTag(newTag);
    setSelectedTags((prevTags) => [...prevTags, newTag]);
    setOpenAddTagModal(false);
    handleSnackBar('¡El nuevo tag se ha creado exitosamente!', 'success');
  };

  const convertColorToHex = (color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const hexColor = ctx.getImageData(0, 0, 1, 1).data;
    return `#${hexColor[0].toString(16).padStart(2, '0')}${hexColor[1]
      .toString(16)
      .padStart(2, '0')}${hexColor[2].toString(16).padStart(2, '0')}`;
  };

  const handleNewTagNameChange = (event) => {
    const newName = event.target.value.toUpperCase();
    setNewTagName(newName);
  };

  const handleToggleUserSelection = (userId: string): void => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSelectAllUsers = (): void => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.length === users.length) {
        return [];
      } else {
        return users.map((user) => user.id);
      }
    });
  };

  const formatDate = (date) => {
    const fecha = new Date(date * 1000);
    return format(fecha, 'yyyy/MM/dd HH:mm');
  };

  const renderRoles = (proRoles) => {
    const roles = proRoles || [];
    const rolesValidados = roles.map((role, index) => {
      return role.id ? (
        <Typography key={index} noWrap variant="subtitle2">
          {role.id}
        </Typography>
      ) : null;
    });

    return (
      <>
        {rolesValidados.length > 0 ? (
          rolesValidados
        ) : (
          <Typography variant="subtitle2">NO VERIFICADA</Typography>
        )}
      </>
    );
  };

  return (
    <>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={11}>
          <Autocomplete
            multiple
            value={selectedTags}
            onInputChange={(event, value) => setNewTagName(value)}
            onChange={handleTagOnChange}
            options={[
              { id: 'addTag', tagName: 'Agregar' },
              ...fetchTagsDummy.filter(
                (tag) =>
                  tag.isTagVisible &&
                  !selectedTags.some((selectedTag) => selectedTag.id === tag.id)
              )
            ]}
            getOptionLabel={(option) => option.tagName}
            filterOptions={(options, { inputValue }) =>
              options.filter(
                (option) =>
                  option.tagName
                    .toLowerCase()
                    .startsWith(inputValue.toLowerCase()) ||
                  option.id === 'addTag'
              )
            }
            renderInput={(params) => (
              <TextField {...params} label="Buscar Tags" />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.id === 'addTag' ? (
                  <Button
                    onClick={() => handleAddTag()}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    {option.tagName}
                  </Button>
                ) : (
                  <>
                    <Box
                      component="span"
                      style={{
                        backgroundColor: option.tagColor,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '5px'
                      }}
                    ></Box>
                    {option.tagName}
                  </>
                )}
              </Box>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Tooltip key={option.id} title={option.tagName}>
                  <div
                    {...getTagProps({ index })}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: '#e1e1e8',
                      borderRadius: '20px',
                      padding: '2px 10px',
                      marginRight: '5px'
                    }}
                  >
                    <span
                      style={{
                        marginRight: '5px',
                        backgroundColor: option.tagColor,
                        color: '#FFF',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {option.tagName.charAt(0)}
                    </span>
                    <Typography variant="body2" sx={{ marginRight: '5px' }}>
                      {option.tagName}
                    </Typography>
                    <CancelRoundedIcon
                      onClick={() => handleRemoveTag(option)}
                      style={{ cursor: 'pointer' }}
                    />{' '}
                  </div>
                </Tooltip>
              ))
            }
          />
        </Grid>
        <Grid item xs={1} textAlign="left">
          <Tooltip
            title="Agregar tags a los usuarios seleccionados"
            arrow
            style={{ cursor: 'pointer' }}
          >
            <TurnedInIcon />
          </Tooltip>
        </Grid>
      </Grid>

      {/* Modal para agregar nuevo tag */}
      <Dialog open={openAddTagModal} onClose={handleCloseAddTagModal}>
        <DialogTitle>Agregar Nuevo Tag</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Tag"
            type="text"
            fullWidth
            value={newTagName}
            onChange={handleNewTagNameChange}
          />
          <TextField
            margin="dense"
            label="Color del Tag"
            type="color"
            fullWidth
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newTagVisible}
                onChange={(e) => setNewTagVisible(e.target.checked)}
                color="primary"
              />
            }
            label="Visible"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTagModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddNewTag} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      <Card sx={{ mt: 2 }}>
        <Box p={2}>
          <TextField
            sx={{ m: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder={t(
              'Buscar por usuario, nombre, apellido, dni o teléfono...'
            )}
            value={query}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Box>

        <Divider />
        {paginatedUsers.length === 0 ? (
          <>
            <Typography
              sx={{ py: 10 }}
              variant="h3"
              fontWeight="normal"
              color="text.secondary"
              align="center"
            >
              {t(
                'No pudimos encontrar ningún usuario que coincida con sus criterios de búsqueda'
              )}
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        onChange={handleSelectAllUsers}
                      />
                    </TableCell>
                    <TableCell>{t('Usuario')}</TableCell>
                    <TableCell>{t('Instagram')}</TableCell>
                    <TableCell>{t('Verificado por')}</TableCell>
                    <TableCell>{t('Fecha de verificación')}</TableCell>
                    <TableCell>{t('Apellido y Nombre')}</TableCell>
                    <TableCell>{t('DNI')}</TableCell>
                    <TableCell>{t('Fecha de nacimiento')}</TableCell>
                    <TableCell>{t('Género')}</TableCell>
                    <TableCell>{t('Télefono')}</TableCell>
                    <TableCell>{t('Fecha de registro')}</TableCell>
                    <TableCell>{t('Cuenta')}</TableCell>
                    <TableCell>{t('Rol')}</TableCell>
                    <TableCell>{t('Status')}</TableCell>
                    <TableCell align="center">{t('Acciones')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => {
                    const isUserSelected = selectedUsers.includes(user.id);
                    return (
                      <TableRow hover key={user.id} selected={isUserSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isUserSelected}
                            onChange={() => handleToggleUserSelection(user.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proEmail}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proInstagram !== null
                              ? user.proInstagram
                              : 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proVerificatorUser !== null
                              ? user.proVerificatorUser
                              : 'NO VERIFICADO'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {format(
                              new Date(user.proVerificationTime),
                              'dd/MM/yyyy HH:mm'
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {`${user.proLastName} ${user.proName}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proDNI !== null ? user.proDNI : 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proBirthDate !== null
                              ? user.proBirthDate
                              : 'No Disponible'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proGender === 'female'
                              ? 'Femenino'
                              : user.proGender === 'male'
                              ? 'Masculino'
                              : 'Desconocido'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {user.proPhone}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {formatDate(user.init_date)}
                          </Typography>
                        </TableCell>
                        <TableCell>{renderRoles(user.proRoles)}</TableCell>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            variant="subtitle2"
                            style={{
                              color: user.proVerified !== 0 ? '#57CA22' : null
                            }}
                          >
                            {user.proVerified !== 0
                              ? 'VERIFICADA'
                              : 'NO VERIFICADA'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            fontWeight="bold"
                            variant="subtitle2"
                            style={{
                              color:
                                user.proInactiveAccount === 0 ? '#57CA22' : null
                            }}
                          >
                            {user.proInactiveAccount === 0
                              ? 'ACTIVO'
                              : 'INACTIVO'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={t('Notifificar usuario')} arrow>
                              <IconButton color="primary">
                                <NotificationsIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Cargar puntos')} arrow>
                              <IconButton color="primary">
                                <StarIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Útimos movimientos')} arrow>
                              <IconButton color="primary">
                                <LoyaltyRoundedIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Editar usuario')} arrow>
                              <IconButton color="primary">
                                <EditTwoToneIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={
                                user.proVerified === 0
                                  ? t('Verificar usuario')
                                  : t('Anular verificación')
                              }
                              arrow
                            >
                              <IconButton
                                style={{
                                  color:
                                    user.proVerified === 0
                                      ? '#FF0000'
                                      : '#57CA22'
                                }}
                              >
                                <VerifiedUserIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Desactivar usuario')} arrow>
                              <IconButton color="primary">
                                <DoNotDisturbAltIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Eliminar evento')} arrow>
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  setSelectedUser(user);
                                  handleConfirmDelete();
                                }}
                              >
                                <DeleteTwoToneIcon />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredUsers.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>
          <Typography align="center" sx={{ py: 4, px: 6 }} variant="h3">
            {t(
              '¿Está seguro de que desea eliminar permanentemente este usuario?'
            )}
          </Typography>
          <Box>
            <Button
              variant="text"
              size="large"
              sx={{ mx: 1 }}
              onClick={closeConfirmDelete}
            >
              {t('Cancelar')}
            </Button>
            <ButtonError
              size="large"
              sx={{ mx: 1, px: 3 }}
              variant="contained"
              onClick={handleDeleteCompleted}
            >
              {t('Borrar')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  users: PropTypes.array.isRequired
};

Results.defaultProps = {
  users: []
};

export default Results;
