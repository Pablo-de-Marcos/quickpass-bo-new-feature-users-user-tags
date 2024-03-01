import { FC, ChangeEvent, useState, ReactElement, Ref, forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled,
  DialogTitle,
  DialogActions,
  InputAdornment
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useSnackbar, VariantType } from 'notistack';
import axios from '../../../utils/axiosCreate';
import type { Roles } from 'src/models/roles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import wait from 'src/utils/wait';
import { DialogContent, CircularProgress } from '@mui/material';
import { useEffect, SyntheticEvent } from 'react';
import BulkActions from './BulkActions';

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
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
  roles: Roles[];
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Filters {
  role?: Roles;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (
  roles: Roles[],
  query: string,
  filters: Filters
): Roles[] => {
  return roles.filter((role) => {
    let matches = true;

    if (query) {
      const properties = ['name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (role[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.role && role !== filters.role) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && role[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (
  roles: Roles[],
  page: number,
  limit: number
): Roles[] => {
  return roles.slice(page * limit, page * limit + limit);
};

interface ValueFormProps {
  name: string;
  description: string;
  submit: boolean;
}

const Results: FC<ResultsProps> = ({ roles, refresh }) => {
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  //* Para el edit:
  const [selectedRole, setSelectedRole] = useState<Roles>(null);
  const [initialValue, setInitialValue] = useState<ValueFormProps>(null);

  const initialValuesFormik: ValueFormProps = {
    name: '',
    description: '',
    submit: null
  };

  useEffect(() => {
    if (selectedRole) {
      setInitialValue({
        name: selectedRole.name,
        description: selectedRole.description || '',
        submit: null
      });
    }
  }, [selectedRole, refresh]);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    role: null
  });

  // Eliminar funcion no usada:
  const handleTabsChange = (_event: SyntheticEvent, tabsValue: unknown) => {
    let value = null;

    setFilters((prevFilters) => ({
      ...prevFilters,
      role: value
    }));

    setSelectedRoles([]);
  };
  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const filteredRoles = applyFilters(roles, query, filters);
  const paginatedRoles = applyPagination(filteredRoles, page, limit);
  const selectedBulkActions = selectedRoles.length > 0;

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  //Uso este hook para que al eliminar un rol unico de una pagina me rediriga a la pagina 0
  useEffect(() => {
    if (paginatedRoles.length === 0) {
      setPage(0);
    }
  }, [isDeleted, paginatedRoles]);

  //* EDIT ROLE:
  const handleUpdateRoleOpen = () => {
    setOpen(true);
  };

  const handleUpdateRoleClose = () => {
    setOpen(false);
  };

  //* DELETE ROLE:
  const handleConfirmDelete = async () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = async () => {
    setOpenConfirmDelete(false);
    try {
      await axios.delete(`/roles/${selectedRole.id}`);
      refresh((prevState) => !prevState);
      handleSnackBar('El rol se eliminó exitosamente', 'success');
      setIsDeleted((prevState) => !prevState);
    } catch (error) {
      handleSnackBar('El rol no pudo ser eliminado', 'error');
    }
  };

  const handleSnackBar = (msg: string, type: VariantType) => {
    enqueueSnackbar(msg, {
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
  };

  return (
    <>
      {
        <Card>
          <Box p={2}>
            {!selectedBulkActions && (
              <TextField
                sx={{
                  m: 0
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  )
                }}
                onChange={handleQueryChange}
                placeholder={'Buscar por estadística'}
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
            {selectedBulkActions && <BulkActions />}
          </Box>
          <Divider />
          {paginatedRoles.length === 0 ? (
            <>
              <Typography
                sx={{
                  py: 10
                }}
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
                {'No se encontraron estadísticas. Por favor agregue una'}
              </Typography>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">{'ID'}</TableCell>
                      <TableCell align="center">{'Rol'}</TableCell>
                      <TableCell align="center">{'Descripcion'}</TableCell>
                      <TableCell align="center">{'Acciones'}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRoles.map((role) => {
                      const isRoleSelected = selectedRoles.includes(role.id);
                      return (
                        <TableRow hover key={role.id} selected={isRoleSelected}>
                          <TableCell align="center">
                            <Typography variant="subtitle2">
                              {role.id}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap variant="h5">
                              {role.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {role.description}
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title={'Editar'} arrow>
                                <IconButton
                                  onClick={() => {
                                    setSelectedRole(role);
                                    handleUpdateRoleOpen();
                                  }}
                                  color="primary"
                                >
                                  <EditTwoToneIcon fontSize="medium" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title={'Borrar'} arrow>
                                <IconButton
                                  onClick={() => {
                                    setSelectedRole(role);
                                    handleConfirmDelete();
                                  }}
                                  color="error"
                                >
                                  <DeleteTwoToneIcon fontSize="medium" />
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
                  count={filteredRoles.length}
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
      }
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
          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6
            }}
            variant="h3"
          >
            {'Eliminar definitivamente'}?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1
              }}
              onClick={closeConfirmDelete}
            >
              {'Cancelar'}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {'Eliminar'}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
      <Dialog maxWidth="xl" open={open} onClose={handleUpdateRoleClose}>
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography align="left" variant="h4" gutterBottom>
            {'Actualizar rol'}
          </Typography>
          <Typography variant="subtitle2">
            {`Usa esta ventana para editar un nuevo rol`}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={initialValue || initialValuesFormik}
          enableReinitialize
          validationSchema={Yup.object().shape({
            name: Yup.string().max(50).required('Rol es un campo requerido'),
            description: Yup.string().max(240)
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            //* UPDATE:
            try {
              await wait(1000);
              delete _values.submit;
              await axios.put(`/roles/${selectedRole.id}`, {
                name: _values.name.replaceAll(/\s+/g, ' ').trim(),
                description: _values.description.replaceAll(/\s+/g, ' ').trim()
              });
              handleSnackBar('El rol se actualizó correctamnete', 'success');
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleUpdateRoleClose();
              refresh((prevState) => !prevState);
            } catch (error) {
              if (error.message.includes('ER_DUP_ENTRY')) {
                handleSnackBar('Este rol ya existe', 'error');
              } else {
                handleSnackBar('Ocurrió un error al editar el rol', 'error');
              }
              console.error(error.message);
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label={'Rol'}
                      name="name"
                      autoFocus={true}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label={'Descripcion'}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleUpdateRoleClose}>
                  {'Cancelar'}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {'Actualizar'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

Results.propTypes = {
  roles: PropTypes.array.isRequired
};

Results.defaultProps = {
  roles: []
};

export default Results;
