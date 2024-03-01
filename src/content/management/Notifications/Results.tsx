import { FC, ChangeEvent, useState, ReactElement, Ref, forwardRef, useEffect } from 'react';
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
  Divider,
  TextField,
  Zoom,
  styled
} from '@mui/material';
import type { Notification } from 'src/models/notification';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar, VariantType } from 'notistack';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';

const DialogWrapper = styled(Dialog)(() => 
  `
    .MuiDialog-paper {
      overflow: visible;
    }
  `
);

const AvatarError = styled(Avatar)(({ theme }) => 
  `
    background-color: ${theme.colors.error.lighter};
    color: ${theme.colors.error.main};
    width: ${theme.spacing(12)};
    height: ${theme.spacing(12)};
    .MuiSvgIcon-root {
      font-size: ${theme.typography.pxToRem(45)};
    }
  `
);

const ButtonError = styled(Button)(({ theme }) => 
  `
    background: ${theme.colors.error.main};
    color: ${theme.palette.error.contrastText};

    &:hover {
      background: ${theme.colors.error.dark};
    }
  `
);

interface ResultsProps {
  notifications: Notification[];
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (
  notifications: Notification[], 
  query: string
): Notification[] => {
  return notifications.filter((notification) => {
    let matches = true;

    if (query) {
      const columnsToSearch = ['title', 'body'];
      let containsQuery = false;

      columnsToSearch.forEach((column) => {
        if (notification.tskParams[column].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    };
    return matches;
  });
};

const applyPagination = (
  notifications: Notification[],
  page: number,
  limit: number
): Notification[] => {
  return notifications.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ notifications, refresh }) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification>(null);
  const { t }: { t: any } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (notification: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (notification: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(notification.target.value));
  };

  const filteredNotifications = applyFilters(notifications, query);
  const paginatedNotifications = applyPagination(filteredNotifications, page, limit);

  useEffect(() => {
    if (paginatedNotifications.length === 0) {
      setPage(0);
    }
  }, [isDeleted, paginatedNotifications]);

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
      await axiosCreate.delete(`notifications/${selectedNotification.id}`);
      refresh((prevState) => !prevState);
      handleSnackBar('La notificación se eliminó exitosamente', 'success');
      setIsDeleted((prevState) => !prevState);
    } catch (error) {
      handleSnackBar('La notificación no pudo ser eliminado', 'error');
    } */

    refresh((prevState) => !prevState);
    handleSnackBar('La notificación se eliminó exitosamente', 'success');
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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  };

  const formatDate = (date) => {
    const formattedDate = format(new Date(date._seconds * 1000 + date._nanoseconds / 1e6), 'MM/dd/yyyy HH:mm:ss');
    return formattedDate;
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        pb={3}
      ></Box>
      <Card>
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
            placeholder={t('Buscar por titulo o descripción...')}
            value={query}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Box>

        <Divider />
        {paginatedNotifications.length === 0 ? (
          <>
            <Typography sx={{ py: 10 }} variant="h3" fontWeight="normal" color="text.secondary" align="center">
              {t('No pudimos encontrar ninguna notificación que coincida con sus criterios de búsqueda')}
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('Título')}</TableCell>
                    <TableCell>{t('Descripción')}</TableCell>
                    <TableCell align='center'>{t('Imágen')}</TableCell>
                    <TableCell align='center'>{t('Status')}</TableCell>
                    <TableCell align='center'>{t('Fecha de ejecución')}</TableCell>
                    <TableCell align='center'>{t('Acciones')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedNotifications.map((notification) => {
                    return (
                      <TableRow hover key={notification.id}>
                          <TableCell>
                            <Tooltip title={notification.tskParams.title}>
                              <Typography noWrap variant="subtitle2">
                                {truncateText(notification.tskParams.title, 16)}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={notification.tskParams.body}>
                              <Typography noWrap variant="subtitle2">
                                {truncateText(notification.tskParams.body, 22)}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight="bold">
                            {notification.tskTags && notification.tskTags.length > 0 && notification.tskTags[0].isTagVisible ? 'Imagen' : 'Sin Imagen'}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography  
                              fontWeight="bold" 
                              style={{ color: notification.tskStatus === 'complete' ? '#57CA22' : '#FF0000' }}>
                                {notification.tskStatus === 'complete' ? 'ENVIADA' : 'ERROR'}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap variant="subtitle2">
                              {formatDate(notification.tskRunDate)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              {notification.tskUsersNotified && (
                                <Tooltip title={t('Usuarios notificados')} arrow>
                                  <IconButton color="primary">
                                    <GroupIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {notification.tskStatus === 'error' && (
                                <>
                                  <Tooltip title={t('Editar notificación')} arrow>
                                    <IconButton color="primary">
                                      <EditTwoToneIcon/>
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title={t('Eliminar notificación')} arrow>
                                    <IconButton 
                                      color="primary" 
                                      onClick={() => {
                                        setSelectedNotification(notification);
                                        handleConfirmDelete();
                                      }}
                                    >
                                      <DeleteTwoToneIcon/>
                                      </IconButton>
                                  </Tooltip>
                                </>
                              )}
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
                count={filteredNotifications.length}
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
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={5}>
          <AvatarError>
            <CloseIcon />
          </AvatarError>
          <Typography align="center" sx={{ py: 4, px: 6 }} variant="h3">
            {t('¿Está seguro de que desea eliminar permanentemente esta notificación?')}
          </Typography>
          <Box>
            <Button variant="text" size="large" sx={{ mx: 1 }} onClick={closeConfirmDelete}>
              {t('Cancelar')}
            </Button>
            <ButtonError size="large" sx={{ mx: 1, px: 3 }} variant="contained" onClick={handleDeleteCompleted}>
              {t('Borrar')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  notifications: PropTypes.array.isRequired
};

Results.defaultProps = {
  notifications: []
};

export default Results;
