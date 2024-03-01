import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import {
  styled,
  Grid,
  Card,
  Box,
  Checkbox,
  Zoom,
  Typography,
  Divider,
  TextField,
  CircularProgress,
  Avatar,
  Autocomplete,
  Select,
  MenuItem,
  Button,
  ListItem,
  ListItemText,
  Alert,
  List
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DatePicker from '@mui/lab/DatePicker';
import { useSnackbar, VariantType } from 'notistack';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDropzone } from 'react-dropzone';
import { THUMBNAIL_PLACEHOLDER } from 'src/utils/constants';
import 'react-quill/dist/quill.snow.css';

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(3)};
      background: ${theme.colors.alpha.black[5]};
      border: 1px dashed ${theme.colors.alpha.black[30]};
      outline: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: ${theme.transitions.create(['border', 'background'])};
  
      &:hover {
        background: ${theme.colors.alpha.white[100]};
        border-color: ${theme.colors.primary.main};
      }
  `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.success.light};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
  `
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.error.light};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
  `
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
  `
);

interface ValuesFormProps {
  evtTitle: string;
  evtDescription: string;
  evtDateTime: Date;
  evtPlaceAddress: string;
  evtInitDate: Date;
  evtEndDate: Date;
  evtState: string;
  evtConditions: string;
  evtSellVerify: string;
  evtSellRrppEnable: string;
  evtTags: any;
  submit: any;
}

const fetchPlacesDummy = [
  {
    "plcAddress": "Av. Amadeo Sabattini 4591",
    "plcCoordinates": {
      "_latitude": null,
      "_longitude": null
    },
    "plcName": "Arco de Córdoba",
    "id": "cvEHCGh7v83maxqi8fbx"
  },
  {
    "plcAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
    "plcCoordinates": {
      "_latitude": null,
      "_longitude": null
    },
    "plcName": "Keops",
    "id": "lMT7mH5IqQ6ZtRQtWWkF"
  }
];

const fetchCategoriesDummy = [
  {
    "id": "Canje"
  },
  {
    "id": "Combo"
  },
  {
    "id": "Entrada"
  },
  {
    "id": "Ticket"
  },
  {
    "id": "Traslados"
  },
  {
    "id": "Voucher"
  }
];

function GeneralSection() {
  const { t }: { t: any } = useTranslation();
  const location: any = useLocation();
  const navigate = useNavigate();
  const copyEventData = location.state ? location.state.copyEventData : null;
  const { enqueueSnackbar } = useSnackbar();
  const [thumbnail, setThumbnail] = useState({ preview: null, file: null, error: false });
  const onDropThumbnail = useCallback((files: File[]) => {
    setThumbnail({ error: false, file: files[0], preview: URL.createObjectURL(files[0]) });
  }, []);
  const {
    acceptedFiles: acceptedFilesThumbnail,
    isDragActive: isDragActiveThumbnail,
    isDragAccept: isDragAcceptThumbnail,
    isDragReject: isDragRejectThumbnail,
    getRootProps: getRootPropsThumbnail,
    getInputProps: getInputPropsThumbnail
  } = useDropzone({
    accept: {'image/png': ['.png'], 'image/jpeg': ['.jpg']},
    multiple: false,
    onDrop: onDropThumbnail
  });

  const filesThumbnail = acceptedFilesThumbnail.map((file, index) => {
    return (
      <ListItem disableGutters component="div" key={index}>
        <ListItemText primary={file.name} />
        <b>{file.size} bytes</b>
        <Divider />
      </ListItem>
    );
  });

  const createEvent = async (response: ValuesFormProps, setSubmitting, resetForm, setStatus, setErrors) => {
    delete response.submit;
    const formattedValues = { ...response, avatar_url: THUMBNAIL_PLACEHOLDER };

    /* try {
      const resp = await axiosCreate.post('/events', formattedValues);

      const storage = getStorage();
      const refThumbnailImage = `images/profile/${resp.data.data.id}.png`;

      const storageRefThumbnailImage = ref(storage, refThumbnailImage);

      await uploadBytes(storageRefThumbnailImage, thumbnail.file);

      const urlThumbnailImage = await getDownloadURL(
        ref(storage, refThumbnailImage)
      );

      await axiosCreate.put(`/users/${resp.data.data.id}`, {
        avatar_url: urlThumbnailImage
      });
      handleSnackBar('Usuario creado con éxito', 'success');
      refresh((prevState: any) => !prevState);
      resetForm();
      setStatus({ success: true });
      setSubmitting(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
      if (error.message === 'This email already exists') {
        setErrors({ email: 'Este email ya esta en uso' });
      }
      handleSnackBar('Ocurrió un error al crear el usuario', 'error');
      setStatus({ success: false });
      setSubmitting(false);
    } */
    handleSnackBar('Evento creado con éxito', 'success');
    resetForm();
    setStatus({ success: true });
    setSubmitting(false);
    navigate('/dashboard/management/events');
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

  return (
    <Card sx={{ p: 6 }}>
      <Grid container spacing={3}>
        <Formik
          initialValues={ copyEventData || {
            evtTitle: '',
            evtDescription: '',
            evtDateTime: new Date(),
            evtPlaceAddress: '',
            evtInitDate: new Date(),
            evtEndDate: new Date(),
            evtState: '',
            evtConditions: '',
            evtSellVerify: '',
            evtSellRrppEnable: '',
            evtTags: [],
            submit: null
          }}
          validationSchema={Yup.object().shape({
            evtTitle: Yup.string().max(255).required(t('El campo de título de evento es obligatorio')),
            evtDescription: Yup.string().max(255).required(t('El campo de descripción de evento es obligatorio')),
            evtConditions: Yup.string().max(255).required(t('El campo de condiciones de evento es obligatorio'))
          })}
          onSubmit={async( _values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              if (thumbnail.file) {
                createEvent(_values, setSubmitting, resetForm, setStatus, setErrors);
              } else if (!thumbnail.file) {
                setThumbnail((prevState) => ({ ...prevState, error: true }));
                setStatus({ success: false });
                setSubmitting(false);
              }
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <b>Título del evento:</b>
                    </Box>
                    <TextField
                      error={Boolean(touched.evtTitle && errors.evtTitle)}
                      fullWidth
                      /* helperText={touched.evtTitle && errors.evtTitle} */
                      name="evtTitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.evtTitle}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <b>Descripción:</b>
                    </Box>
                    <TextField
                      error={Boolean(touched.evtDescription && errors.evtDescription)}
                      fullWidth
                      /* helperText={touched.evtDescription && errors.evtDescription} */
                      name="evtDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.evtDescription}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box pb={1}>
                      <b>Fecha del evento:</b>
                    </Box>
                    <DatePicker
                      value={values.evtDateTime}
                      onChange={(date) => setFieldValue('evtDateTime', date)}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          name="evtDateTime"
                          label={t('Fecha del evento')}
                          onBlur={handleBlur}
                          error={Boolean(touched.evtDateTime && errors.evtDateTime)}
                          placeholder={t('Fecha del evento')}
                          variant="outlined"
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box pb={1}>
                      <b>Ubicación:</b>
                    </Box>
                    <TextField
                      error={Boolean(touched.evtPlaceAddress && errors.evtPlaceAddress)}
                      fullWidth
                      /* helperText={touched.evtPlaceAddress && errors.evtPlaceAddress} */
                      name="evtPlaceAddress"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.evtPlaceAddress}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box pb={1}>
                      <b>Fecha/Hora Inicio disponibilidad:</b>
                    </Box>
                    <DatePicker
                      value={values.evtInitDate}
                      onChange={(date) => setFieldValue('evtInitDate', date)}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          name="evtInitDate"
                          label={t('Fecha/Hora Inicio disponibilidad')}
                          onBlur={handleBlur}
                          error={Boolean(touched.evtInitDate && errors.evtInitDate)}
                          placeholder={t('Fecha/Hora Inicio disponibilidad')}
                          variant="outlined"                          
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box pb={1}>
                      <b>Fecha/Hora Fin disponibilidad:</b>
                    </Box>
                    <DatePicker
                      value={values.evtEndDate}
                      onChange={(date) => setFieldValue('evtEndDate', date)}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          name="evtEndDate"
                          label={t('Fecha/Hora Fin disponibilidad')}
                          onBlur={handleBlur}
                          error={Boolean(touched.evtEndDate && errors.evtEndDate)}
                          placeholder={t('Fecha/Hora Fin disponibilidad')}
                          variant="outlined"
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <b>¿Evento Activo?</b>
                    </Box>
                    <Select
                      fullWidth
                      name="evtState"
                      value={values.evtState}
                      onChange={handleChange}
                    >
                      <MenuItem value={'ACTIVO'}>ACTIVO</MenuItem>
                      <MenuItem value={'INACTIVO'}>INACTIVO</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <b>Condiciones del evento:</b>
                    </Box>
                    <TextField
                      error={Boolean(touched.evtConditions && errors.evtConditions)}
                      fullWidth
                     /*  helperText={touched.evtConditions && errors.evtConditions} */
                      name="evtConditions"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.evtConditions}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box pb={1}>
                      <b>¿Venta verificada?</b>
                    </Box>
                    <Select
                      fullWidth
                      name="evtSellVerify"
                      value={values.evtSellVerify}
                      onChange={handleChange}
                    >
                      <MenuItem value={'SI'}>SI</MenuItem>
                      <MenuItem value={'NO'}>NO</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Box pb={1}>
                      <b>¿Habilitada venta RRPP?</b>
                    </Box>
                    <Select
                      fullWidth
                      name='evtSellRrppEnable'
                      value={values.evtSellRrppEnable}
                      onChange={handleChange}
                    >
                      <MenuItem value={'SI'}>SI</MenuItem>
                      <MenuItem value={'NO'}>NO</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Box pb={1}>
                      <b>Asocia el evento a un tag:</b>
                    </Box>
                    <Autocomplete
                      multiple
                      fullWidth
                      options={fetchCategoriesDummy}
                      disableCloseOnSelect
                      value={values.evtTags.tagName}
                      getOptionLabel={(option) => option.tagName}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.tagName}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Asocia el evento a un tag" />
                      )}
                      onChange={(event, newValue) => {
                        // Actualiza los valores en el formulario al seleccionar/deseleccionar tags
                        setFieldValue('evtTags.tagName', newValue);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  mt={3}
                >
                  <BoxUploadWrapper
                    {...getRootPropsThumbnail()}
                    onClick={(e) => {
                      getRootPropsThumbnail().onClick(e);
                      setThumbnail((prevState) => ({
                        ...prevState,
                        file: null,
                        preview: null
                      }));
                    }}
                  >
                    <input {...getInputPropsThumbnail()} />
                    {thumbnail.file && (
                      <>
                        <img src={thumbnail.preview} style={{ height: '102px' }} alt=""/>
                      </>
                    )}
                    {isDragAcceptThumbnail && !thumbnail.file && (
                      <>
                        <AvatarSuccess variant="rounded">
                          <CheckTwoToneIcon />
                        </AvatarSuccess>
                        <Typography sx={{ mt: 2 }}>
                          {'Arrastre y suelte la imagen que desea subir aquí..'}
                        </Typography>
                      </>
                    )}
                    {isDragRejectThumbnail && !thumbnail.file && (
                      <>
                        <AvatarDanger variant="rounded">
                          <CloseTwoToneIcon />
                        </AvatarDanger>
                        <Typography sx={{ mt: 2 }}>
                          {'No puede subir este tipo de archivo'}
                        </Typography>
                      </>
                    )}
                    {!isDragActiveThumbnail && !thumbnail.file && (
                      <>
                        <AvatarWrapper variant="rounded">
                          <CloudUploadTwoToneIcon />
                        </AvatarWrapper>
                        <Typography sx={{ mt: 2 }}>
                          {'Arrastre & suelte aquí..'}
                        </Typography>
                      </>
                    )}
                  </BoxUploadWrapper>
                  {filesThumbnail.length > 0 && (
                    <>
                      <Alert sx={{ py: 0, mt: 2 }} severity="success">
                        {'Subiste'} <b>{filesThumbnail.length}</b>{' '}
                        {'archivo/s'}!
                      </Alert>
                      <Divider sx={{ mt: 2 }}/>
                      <List disablePadding component="div">
                        {filesThumbnail}
                      </List>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  startIcon={ isSubmitting ? <CircularProgress size="1rem" /> : null}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Crear evento')}
                </Button>
              </Grid>
            </form>
          )}
        </Formik>

      </Grid>
    </Card>
  );
}

export default GeneralSection;
