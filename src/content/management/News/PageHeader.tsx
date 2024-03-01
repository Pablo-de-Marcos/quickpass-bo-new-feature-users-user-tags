import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled, Grid, Typography, Button, Tooltip} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Administración de novedades')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Todos los aspectos relacionados con las novedades de la aplicación se pueden gestionar desde esta página')}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, sm: 0 } }}
                component={RouterLink}
                to={`/${location.pathname.split('/')[1]}/management/news/create`}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                {t('Crear nueva novedad')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PageHeader;