import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Link,
  TextField,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import useRefMounted from 'src/hooks/useRefMounted';
import { loginErrorHandler } from './utils';

function LoginFirebaseAuth() {
  const { signInWithEmailAndPassword } = useAuth() as any;
  const isMountedRef = useRefMounted();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Debe ser un email valido')
            .max(255)
            .required('Email es requerido'),
          password: Yup.string().max(255).required('Contraseña es requerida')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await signInWithEmailAndPassword(values.email, values.password);
            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.code });
              setSubmitting(false);
            }
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
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label={'Email'}
              placeholder={'Ingresar tu email aquí...'}
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label={'Contraseña'}
              placeholder={'Ingresar tu contraseña aquí...'}
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <Box
              alignItems="center"
              display={{ xs: 'flex', md: 'flex' }}
              justifyContent="flex-end"
            >
              <Link component={RouterLink} to="/account/recover-password">
                <b>{'Olvidaste la contraseña?'}</b>
              </Link>
            </Box>
            {Boolean(errors.submit) && (
              <FormHelperText error>
                {loginErrorHandler(errors.submit)}
              </FormHelperText>
            )}
            <Button
              sx={{
                mt: 3
              }}
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
            >
              {'Iniciar sesión'}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginFirebaseAuth;
