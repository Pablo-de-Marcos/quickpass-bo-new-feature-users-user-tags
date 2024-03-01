import { useTranslation } from 'react-i18next';
import { styled, Grid, Typography, Button, Tooltip} from '@mui/material';
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
            {t('Administración de usuarios')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Todos los aspectos relacionados con los usuarios de la aplicación se pueden gestionar desde esta página')}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
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