import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled, Grid, Typography, Button, Tooltip} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Administración de eventos')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Todos los aspectos relacionados con los eventos de la aplicación se pueden gestionar desde esta página')}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, sm: 0 } }}
                component={RouterLink}
                to={`/${location.pathname.split('/')[1]}/management/events/create`}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                {t('Crear nuevo evento')}
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title={"Descargar listado de eventos"}>
                <Button component="label" variant="contained">
                  <CloudUploadIcon />
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PageHeader;