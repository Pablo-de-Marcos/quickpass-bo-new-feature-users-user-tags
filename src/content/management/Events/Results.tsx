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
  Tabs,
  Button,
  Typography,
  Dialog,
  Divider,
  TextField,
  Zoom,
  styled
} from '@mui/material';
import type { Event } from 'src/models/event';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar, VariantType } from 'notistack';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import MovieFilterTwoToneIcon from '@mui/icons-material/MovieFilterTwoTone';
import EqualizerTwoToneIcon from '@mui/icons-material/EqualizerTwoTone';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone';
import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';

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

interface ResultsProps {
  events: Event[];
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (events: Event[], query: string): Event[] => {
  return events.filter((event) => {
    let matches = true;
    if (query) {
      const properties = ['evtTitle', 'evtCreateUser'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (event[property] != null && event[property].toLowerCase().includes(query.toLowerCase())) {
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
  events: Event[],
  page: number,
  limit: number
): Event[] => {
  return events.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ events, refresh }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const { t }: { t: any } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  // copy event
  const navigate = useNavigate();
  const [copyEventData, setCopyEventData] = useState(null);

  const handleEvent = (action, eventData) => {
    let formatedEvtDateTime = formatDate(eventData.evtDateTime);
    let formatedEvtInitDate = formatDate(eventData.evtInitDate);
    let formatedEvtEndDate = formatDate(eventData.evtEndDate);
    
    let copiedEventData = {
      ...eventData,
      evtState: eventData.evtState === 'ACTIVO' || eventData.evtState === 'INACTIVO'
        ? eventData.evtState
        : 'ACTIVO',
      evtSellVerify: eventData.evtSellVerify === 'SI' || eventData.evtSellVerify === 'NO'
        ? eventData.evtSellVerify
        : 'NO',
      evtSellRrppEnable: eventData.evtSellRrppEnable === 'SI' || eventData.evtSellRrppEnable === 'NO'
        ? eventData.evtSellRrppEnable
        : 'NO',
      evtDateTime: formatedEvtDateTime,
      evtInitDate: formatedEvtInitDate,
      evtEndDate: formatedEvtEndDate,
      /* evtTags: eventData.evtTags ? eventData.evtTags.map(tag => tag.tagName) : [], */
    };
    
    switch (action) {
      case 'copy':
        setCopyEventData(copiedEventData);
        navigate('/dashboard/management/events/create', { state: { copyEventData: copiedEventData } });
        handleSnackBar('El evento se ha copiado exitosamente', 'success');
        break;
      case 'edit':
        setCopyEventData(copiedEventData);
        navigate('/dashboard/management/events/edit', { state: { copyEventData: copiedEventData } });
        break;
      default:
        return;
    }
  };
  
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredEvents = applyFilters(events, query);
  const paginatedEvents = applyPagination(filteredEvents, page, limit);

  useEffect(() => {
    if (paginatedEvents.length === 0) {
      setPage(0);
    }
  }, [isDeleted, paginatedEvents]);

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
      await axiosCreate.delete(`events/${selectedEvent.id}`);
      refresh((prevState) => !prevState);
      handleSnackBar('El evento se eliminó exitosamente', 'success');
      setIsDeleted((prevState) => !prevState);
    } catch (error) {
      handleSnackBar('El evento no pudo ser eliminado', 'error');
    } */

    refresh((prevState) => !prevState);
    handleSnackBar('El evento se eliminó exitosamente', 'success');
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
    const fecha = new Date(date._seconds * 1000 + date._nanoseconds / 1e6);
    return format(new Date(fecha), 'MM/dd/yyyy');
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
            placeholder={t('Buscar por nombre o correo electrónico...')}
            value={query}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Box>

        <Divider />
        {paginatedEvents.length === 0 ? (
          <>
            <Typography sx={{ py: 10 }} variant="h3" fontWeight="normal" color="text.secondary" align="center">
              {t('No pudimos encontrar ningún evento que coincida con sus criterios de búsqueda')}
            </Typography>
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('Nombre')}</TableCell>
                    <TableCell>{t('Descripción')}</TableCell>
                    <TableCell align="center">{t('Venta verificada')}</TableCell>
                    <TableCell align="center">{t('Fecha')}</TableCell>
                    <TableCell align="center">{t('Status')}</TableCell>
                    <TableCell>{t('Creado por')}</TableCell>
                    <TableCell>{t('Modificado por')}</TableCell>
                    <TableCell align="center">{t('Acciones')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEvents.map((event) => {
                    return (
                      <TableRow hover key={event.id}>
                        <TableCell>
                          <Tooltip title={event.evtTitle}>
                            <Typography noWrap variant="subtitle2">
                              {truncateText(event.evtTitle, 20)}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={event.evtDescription}>
                            <Typography noWrap variant="subtitle2">
                              {truncateText(event.evtDescription, 18)}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight="bold">
                          {event.evtSellVerify ? 'SI' : 'NO'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap variant="subtitle2">
                            {formatDate(event.evtDateTime)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            fontWeight="bold"
                            style={{ color: event.evtState === 'active' ? '#57CA22' : '#0F0F0F' }}
                          >
                          {event.evtState === 'active' ? 'ACTIVO' : 'INACTIVO'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap variant="subtitle2">
                            {event.evtCreateUser}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap variant="subtitle2">
                            {event.evtLastUpdateUser}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={t('Gestionar tickets')} arrow>
                              <IconButton color="primary">
                                <MovieFilterTwoToneIcon/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Estadisticas del evento')} arrow>
                              <IconButton color="primary">
                                <EqualizerTwoToneIcon/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Copiar evento')} arrow>
                              <IconButton color="primary" onClick={() => handleEvent('copy', event)}>
                                <FileCopyTwoToneIcon/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Gestionar tipos de tickets')} arrow>
                              <IconButton color="primary">
                                <ConfirmationNumberTwoToneIcon/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Editar evento')} arrow>
                              <IconButton color="primary" onClick={() => handleEvent('edit', event)}>
                                <EditTwoToneIcon/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Eliminar evento')} arrow>
                              <IconButton 
                                color="primary" 
                                onClick={() => {
                                  setSelectedEvent(event);
                                  handleConfirmDelete();
                                }}
                              >
                                <DeleteTwoToneIcon/>
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
                count={filteredEvents.length}
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
            {t('¿Está seguro de que desea eliminar permanentemente este evento?')}
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
  events: PropTypes.array.isRequired
};

Results.defaultProps = {
  events: []
};

export default Results;
