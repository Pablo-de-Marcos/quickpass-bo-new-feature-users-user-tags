import { FC, ChangeEvent, useState, ReactElement, Ref, forwardRef, useEffect } from 'react';
import {
  Avatar,
  Box,
  Slide,
  Card,
  InputAdornment,
  Button,
  Typography,
  Dialog,
  Divider,
  TextField,
  Zoom,
  styled
} from '@mui/material';
import type { Redimidor } from 'src/models/redimidor';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar, VariantType } from 'notistack';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloseIcon from '@mui/icons-material/Close';

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

const fetchUsersByFilterDummy = [
  {
    "tipo": "user",
    "proStatus": {
      "updatedBy": "CygGLGhiT3V0MdT4suPemPrmcR42",
      "cause": "System update",
      "time": {
        "_seconds": 1709126362,
        "_nanoseconds": 259000000
      },
      "value": "active"
    },
    "proDniType": null,
    "proValidatedPhone": "3512345678",
    "proLastName": "mailinator ",
    "proLoyalyMember": null,
    "proPhone": "3512345678",
    "proInactiveAccount": 0,
    "proInstagram": "rrpp2",
    "phoneCode": "880965",
    "proBirthDate": null,
    "proAcceptTerms": 1,
    "proName": "rrpp2",
    "proEmail": "rrpp2@mailinator.com",
    "proTags": [],
    "last_read": 1675110485,
    "init_date": 1675110485,
    "proAcceptWhatsapp": 1,
    "proVerificationTime": "2023-03-27T18:16:12.000Z",
    "proDNI": null,
    "proAccountState": null,
    "proVerificatorUser": "superadm@mailinator.com",
    "proSignupState": "complete",
    "proGender": null,
    "proVerified": false,
    "proRoles": [
      {
        "id": "Rrpp"
      },
      {
        "id": "Redimidor"
      }
    ],
    "proRolesRedimidor": {
      "aMLCVQrF91ZOa5HSEH2A": {
        "rolDesc": "Guardia que redime solo entradas",
        "rolPermissions": [
          {
            "id": "Combo",
            "label": "Control Combo",
            "selected": true
          },
          {
            "id": "Entrada",
            "label": "Control Entrada",
            "selected": true
          },
          {
            "label": "Control Ticket",
            "id": "Ticket",
            "selected": true
          }
        ],
        "rolName": "Guardia de Entradas",
        "rolPlaces": [
          {
            "plcAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
            "plcCoordinates": {
              "_longitude": null,
              "_latitude": null
            },
            "id": "lMT7mH5IqQ6ZtRQtWWkF",
            "plcName": "Keops"
          },
          {
            "plcAddress": "Av. Amadeo Sabattini 4591",
            "plcCoordinates": {
              "_longitude": null,
              "_latitude": null
            },
            "id": "cvEHCGh7v83maxqi8fbx",
            "plcName": "Arco de Córdoba"
          }
        ]
      }
    },
    "id": "ITxCl2WFpIevFitxM1q9TGkZD9c2"
  },
  {
    "tipo": "user",
    "proDniType": null,
    "proLastName": "RRPP",
    "proLoyalyMember": null,
    "proInstagram": null,
    "proBirthDate": null,
    "proName": "RRPP",
    "proAcceptTerms": 1,
    "proEmail": "rrpp@mailinator.com",
    "last_read": 1670197972,
    "init_date": 1670197972,
    "proAcceptWhatsapp": 0,
    "proVerificationTime": null,
    "proDNI": null,
    "proAccountState": null,
    "rrppId": "cOFlxEsjKBdkTxgSqvcz5hyeIpE3",
    "proVerificatorUser": null,
    "proGender": "female",
    "proVerified": 0,
    "proInactiveAccount": false,
    "proSignupState": "complete",
    "proTags": [
      {
        "isTagVisible": true,
        "tagColor": "#e4c70c",
        "id": "v2UW8fXRZhMlKgKAGRHf",
        "tagName": "VIP"
      }
    ],
    "phoneCode": "706606",
    "proPhone": "3512441191",
    "proValidatedPhone": "3512441191",
    "proRoles": [
      {
        "id": "Rrpp"
      },
      {
        "id": "Redimidor"
      }
    ],
    "proRolesRedimidor": {
      "kSt3w8Y84IPsUxQcxReF": {
        "rolDesc": "control de qr en barra",
        "rolName": "Control barra",
        "rolPermissions": [
          {
            "id": "Canje",
            "label": "Control Canje",
            "selected": true
          },
          {
            "id": "Combo",
            "label": "Control Combo",
            "selected": true
          }
        ],
        "rolPlaces": [
          {
            "plcAddress": "Av. Amadeo Sabattini 4591",
            "plcCoordinates": {
              "_longitude": null,
              "_latitude": null
            },
            "id": "cvEHCGh7v83maxqi8fbx",
            "plcName": "Arco de Córdoba"
          }
        ]
      }
    },
    "id": "cOFlxEsjKBdkTxgSqvcz5hyeIpE3"
  }
];

interface ResultsProps {
  redimidores: Redimidor[];
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (redimidores: Redimidor[], query: string): Redimidor[] => {
  return redimidores.filter((redimidor) => {
    let matches = true;
    if (query) {
      const properties = ['rolName'];
      let containsQuery = false;
      properties.forEach((property) => {
        if (redimidor[property] != null && redimidor[property].toLowerCase().includes(query.toLowerCase())) {
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
  redimidores: Redimidor[],
  page: number,
  limit: number
): Redimidor[] => {
  return redimidores.slice(page * limit, page * limit + limit);
};

const Results: FC<ResultsProps> = ({ redimidores, refresh }) => {
  const [selectedRedimidor, setSelectedRedimidor] = useState<Notification>(null);
  const { t }: { t: any } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleQueryChange = (redimidor: ChangeEvent<HTMLInputElement>): void => {
    redimidor.persist();
    setQuery(redimidor.target.value);
  };

  const handlePageChange = (redimidor: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (redimidor: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(redimidor.target.value));
  };

  const filteredRedimidores = applyFilters(redimidores, query);
  const paginatedRedimidores = applyPagination(filteredRedimidores, page, limit);

  useEffect(() => {
    if (paginatedRedimidores.length === 0) {
      setPage(0);
    }
  }, [isDeleted, paginatedRedimidores]);

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
      await axiosCreate.delete(`redimidores/${selectedRedimidor.id}`);
      refresh((prevState) => !prevState);
      handleSnackBar('El rol se eliminó exitosamente', 'success');
      setIsDeleted((prevState) => !prevState);
    } catch (error) {
      handleSnackBar('El rol no pudo ser eliminado', 'error');
    } */

    refresh((prevState) => !prevState);
    handleSnackBar('El rol se eliminó exitosamente', 'success');
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
            placeholder={t('Buscar por titulo de Rol...')}
            value={query}
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Box>

        <Divider />
        {paginatedRedimidores.length === 0 ? (
          <>
            <Typography sx={{ py: 10 }} variant="h3" fontWeight="normal" color="text.secondary" align="center">
              {t('No pudimos encontrar ningun rol que coincida con sus criterios de búsqueda')}
            </Typography>
          </>
        ) : (
          <>

            {/* Contenido */}

          </>
        )}
      </Card>

      <DialogWrapper open={openConfirmDelete} maxWidth="sm" fullWidth TransitionComponent={Transition} keepMounted onClose={closeConfirmDelete}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={5}>
          <AvatarError>
            <CloseIcon />
          </AvatarError>
          <Typography align="center" sx={{ py: 4, px: 6 }} variant="h3">
            {t('¿Está seguro de que desea eliminar permanentemente este rol?')}
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
  redimidores: PropTypes.array.isRequired
};

Results.defaultProps = {
  redimidores: []
};

export default Results;
