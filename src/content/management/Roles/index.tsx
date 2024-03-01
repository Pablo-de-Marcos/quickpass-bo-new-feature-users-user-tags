import { useState, useEffect, useCallback } from 'react';
//import axios from 'src/utils/axios';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';
import type { Redimidor } from 'src/models/redimidor';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Results from './Results';
//import axiosCreate from 'src/utils/axiosCreate';

let fetchRedimidoresDummy = [
    {
        "rolUsers": [
            {
                "proLastName": "mailinator ",
                "id": "TxgNazPbmCOc3TzrsFWSj2tmnvJ2",
                "proName": "guardia",
                "proEmail": "guardia@mailinator.com"
            },
            {
                "proLastName": "mailinator ",
                "id": "ITxCl2WFpIevFitxM1q9TGkZD9c2",
                "proName": "rrpp2",
                "proEmail": "rrpp2@mailinator.com"
            }
        ],
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
        ],
        "rolName": "Guardia de Entradas",
        "id": "aMLCVQrF91ZOa5HSEH2A"
    },
    {
        "rolUsers": [
            {
                "proLastName": "RRPP",
                "id": "cOFlxEsjKBdkTxgSqvcz5hyeIpE3",
                "proName": "RRPP",
                "proEmail": "rrpp@mailinator.com"
            }
        ],
        "rolDesc": "control de qr en barra",
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
        ],
        "rolName": "Control barra",
        "id": "kSt3w8Y84IPsUxQcxReF"
    }
];

function ManagementRedimidores() {
    const isMountedRef = useRefMounted();
    const [redimidores, setRedimidores] = useState<Redimidor[]>([]);
    const [refreshRedimidores, setRefreshRedimidores] = useState<boolean>(false);

    const getRedimidores = () => {
        /* try {
        const response = await axiosCreate.get<{ data: Redimidor[]; status: number }>(
            '/redimidores'
        );
        if (isMountedRef.current) {
            setRedimidores(response.data.data);
        }
        } catch (err) {
            console.error(err);
        } */

        if (isMountedRef.current) {
            setRedimidores(fetchRedimidoresDummy);
        }
    };

    useEffect(() => {
        getRedimidores();
    }, [getRedimidores, refreshRedimidores]);

    return (
        <>
            <Helmet>
                <title>Gestión de Roles</title>
            </Helmet>

            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Grid sx={{ px: 4 }} container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
                <Grid item xs={12}>
                    <Results redimidores={redimidores} refresh={setRefreshRedimidores} />
                </Grid>
            </Grid>
            <Footer/>    
        </>
    );
}

export default ManagementRedimidores;
