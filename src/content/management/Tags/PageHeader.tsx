import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import wait from 'src/utils/wait';
import axios from 'src/utils/axiosCreate';
import { Grid, Dialog, DialogTitle, DialogActions, DialogContent, Zoom, Typography, TextField, CircularProgress, Button } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useSnackbar, VariantType } from 'notistack';

function PageHeader({ refresh }) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateRoleOpen = () => {
    setOpen(true);
  };

  const handleCreateRolClose = () => {
    setOpen(false);
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
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {'Administración de tags'}
          </Typography>
          <Typography variant="subtitle2">
            {
              'Todos los aspectos relacionados con los tags de la app se pueden gestionar desde esta página'
            }
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            onClick={handleCreateRoleOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {'Agregar nuevo tag'}
          </Button>
        </Grid>
      </Grid>
      <Dialog maxWidth="xl" open={open} onClose={handleCreateRolClose}>
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography align="left" variant="h4" gutterBottom>
            {'Crear un rol'}
          </Typography>
          <Typography variant="subtitle2">
            {`Usa esta ventana para cargar un nuevo rol`}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            name: '',
            description: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(50, 'Max. 50')
              .required('Este campo es obligatorio'),
            description: Yup.string().max(240)
          })}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            //POST:
            try {
              await wait(1000);
              delete _values.submit;
              await axios.post('/roles', {
                name: _values.name.replaceAll(/\s+/g, ' ').trim(),
                description: _values.description.replaceAll(/\s+/g, ' ').trim()
              });
              handleSnackBar('El rol se creó exitosamente', 'success');
              handleCreateRolClose();
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              refresh((prevState: any) => !prevState);
            } catch (error) {
              if (error.message.includes('ER_DUP_ENTRY')) {
                handleSnackBar('Este rol ya existe', 'error');
              } else {
                handleSnackBar('Ocurrió un error al editar el rol', 'error');
              }
              console.error(error);
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
                <Grid item xs={12} lg={5} justifyContent="center"></Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleCreateRolClose}>
                  {'Cancel'}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {'Confirmar'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;
