import { useState, useEffect, useCallback } from 'react';
//import axios from 'src/utils/axios';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';
import type { Event } from 'src/models/event';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Results from './Results';
//import axiosCreate from 'src/utils/axiosCreate';

let fetchEventsDummy = [
    {
        "evtImgPath": "events/1672262749120_imagen.png",
        "evtPlace": "Keops",
        "evtSellVerify": false,
        "evtTags": [
            {
                "isTagVisible": false,
                "tagColor": "#1fe022",
                "id": "btj2McNknlZ3Rr68aeaP",
                "tagName": "AGOSTO"
            },
            {
                "isTagVisible": true,
                "tagColor": "#e4c70c",
                "id": "v2UW8fXRZhMlKgKAGRHf",
                "tagName": "VIP"
            }
        ],
        "evtProducer": "1",
        "evtCreateUser": "lautaro.villarroel@vortex-it.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtInitDate": {
            "_seconds": 1672086180,
            "_nanoseconds": 0
        },
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtTitle": "Pruebas Ger 4",
        "evtLastUpdate": {
            "_seconds": 1673450936,
            "_nanoseconds": 890000000
        },
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1672262749120_imagen.png?alt=media&token=cce5c256-4a53-47b3-bb2d-0c4cc08e5e71",
        "evtImgName": "imagen.png",
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtCreated": {
            "_seconds": 1673450936,
            "_nanoseconds": 890000000
        },
        "evtConditions": "Eliminar tras las pruebas",
        "evtDateTime": {
            "_seconds": 1704078000,
            "_nanoseconds": 0
        },
        "evtSellRrppEnable": true,
        "evtName": "Pruebas Ger 4",
        "evtEndDate": {
            "_seconds": 1704054180,
            "_nanoseconds": 0
        },
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtDescription": "Pruebas de tickets por generar en el listado de tickets",
        "evtState": "active",
        "id": "ruzuWskxBttP8lwJ52tA"
    },
    {
        "evtImgPath": "events/1672262749120_imagen.png",
        "evtPlace": "Keops",
        "evtSellVerify": false,
        "evtTags": [
            {
                "isTagVisible": false,
                "tagColor": "#1fe022",
                "id": "btj2McNknlZ3Rr68aeaP",
                "tagName": "AGOSTO"
            }
        ],
        "evtProducer": "1",
        "evtCreateUser": "superadm@mailinator.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtInitDate": {
            "_seconds": 1672086180,
            "_nanoseconds": 0
        },
        "evtTitle": "Pruebas Ger 2",
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1672262749120_imagen.png?alt=media&token=cce5c256-4a53-47b3-bb2d-0c4cc08e5e71",
        "evtImgName": "imagen.png",
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtConditions": "Eliminar tras las pruebas",
        "evtCreated": {
            "_seconds": 1673449630,
            "_nanoseconds": 425000000
        },
        "evtDateTime": {
            "_seconds": 1704078000,
            "_nanoseconds": 0
        },
        "evtSellRrppEnable": true,
        "evtName": "Pruebas Ger 2",
        "evtEndDate": {
            "_seconds": 1704054180,
            "_nanoseconds": 0
        },
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtState": "active",
        "evtDescription": "Pruebas de tickets por generar en el listado de ticket",
        "evtLastUpdate": {
            "_seconds": 1675103907,
            "_nanoseconds": 174000000
        },
        "id": "ofFvEWNaLItqy5uYDLxx"
    },
    {
        "evtImgPath": "events/1672259128095_keopswhite.png",
        "evtPlace": "Keops",
        "evtTags": [],
        "evtSellVerify": false,
        "evtProducer": "1",
        "evtCreateUser": "superadm@mailinator.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtInitDate": {
            "_seconds": 1672086180,
            "_nanoseconds": 0
        },
        "evtTitle": "BENEFICIOS - CANJES",
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1672259128095_keopswhite.png?alt=media&token=a99adc2b-7532-4632-991f-842dcc6ad7e2",
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtImgName": "keopswhite.png",
        "evtCreated": {
            "_seconds": 1672259132,
            "_nanoseconds": 256000000
        },
        "evtConditions": "BENEFICIOS DE KEOPS APP - SOLO DISPONIBLE PARA EL TITULAR DEL TICKET - NO VALIDO PARA CANJEAR POR DINERO EN EFECTIVO - PARA USO EXCLUSIVO A TRAVES DE LA APLICACIÓN",
        "evtDateTime": {
            "_seconds": 1704054120,
            "_nanoseconds": 0
        },
        "evtSellRrppEnable": false,
        "evtName": "BENEFICIOS - CANJES",
        "evtEndDate": {
            "_seconds": 1704054180,
            "_nanoseconds": 0
        },
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtDescription": "BENEFICIOS - CANJES",
        "evtLastUpdate": {
            "_seconds": 1675110281,
            "_nanoseconds": 641000000
        },
        "evtState": "active",
        "id": "5K6g83cpHlQO8oQ0HMbN"
    },
    {
        "evtPlace": "Keops",
        "evtTags": [],
        "evtSellVerify": false,
        "evtProducer": "1",
        "evtCreateUser": "superadm@mailinator.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtInitDate": {
            "_seconds": 1688688480,
            "_nanoseconds": 0
        },
        "evtTitle": "DI CHIARA BROTHERS EN KEOPS!",
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtConditions": "Evento para mayores de 18 años. \nObligatorio presentar DNI para ingresar (físico o Mi Argentina).\nComprando tu anticipada el ingreso es sin limite de horario.\nIngreso con prioridad\nLas entradas no tienen devolución.",
        "evtCreated": {
            "_seconds": 1688688669,
            "_nanoseconds": 125000000
        },
        "evtDateTime": {
            "_seconds": 1689476340,
            "_nanoseconds": 0
        },
        "evtSellRrppEnable": true,
        "evtName": "DI CHIARA BROTHERS EN KEOPS!",
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtDescription": "Desde Italia a la piramide sin escala! Djs exclusivos de Keops Disco. Warm Up [Luciano Bertorello - Exe Groov]",
        "evtState": "active",
        "evtImgPath": "events/1688771078648_image 2.jpg",
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1688771078648_image%202.jpg?alt=media&token=040fffb4-8870-4193-ba17-9e4c0873476e",
        "evtImgName": "image 2.jpg",
        "evtEndDate": {
            "_seconds": 1690797600,
            "_nanoseconds": 0
        },
        "evtLastUpdate": {
            "_seconds": 1690042715,
            "_nanoseconds": 786000000
        },
        "id": "xVYVQ9QjhiV9qJqtwzvn"
    },
    {
        "evtImgPath": "events/1672686807210_keopsBlack.png",
        "evtPlace": "Keops",
        "evtSellVerify": false,
        "evtProducer": "1",
        "evtCreateUser": "superadm@mailinator.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtInitDate": {
            "_seconds": 1672600320,
            "_nanoseconds": 0
        },
        "evtTitle": "Keops Enero 7",
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1672686807210_keopsBlack.png?alt=media&token=6bb7bdab-9873-43f5-9244-8bae08653fd5",
        "evtImgName": "keopsBlack.png",
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtCreated": {
            "_seconds": 1672686810,
            "_nanoseconds": 560000000
        },
        "evtConditions": "T y C",
        "evtDateTime": {
            "_seconds": 1685560260,
            "_nanoseconds": 0
        },
        "evtSellRrppEnable": true,
        "evtName": "Keops Enero 7",
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtDescription": "Keops Enero 7",
        "evtEndDate": {
            "_seconds": 1685661120,
            "_nanoseconds": 0
        },
        "evtState": "active",
        "evtTags": [],
        "evtLastUpdate": {
            "_seconds": 1675111683,
            "_nanoseconds": 747000000
        },
        "id": "1zuCtys6cjN63HL70bDJ"
    },
    {
        "evtImgPath": "events/1675372351170_evento-defaut.jpg",
        "evtPlace": "Keops",
        "evtTags": [],
        "evtSellVerify": false,
        "evtProducer": "1",
        "evtCreateUser": "superadm@mailinator.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtInitDate": {
            "_seconds": 1675285920,
            "_nanoseconds": 0
        },
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtTitle": "evento prueba",
        "evtLastUpdate": {
            "_seconds": 1675372355,
            "_nanoseconds": 929000000
        },
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1675372351170_evento-defaut.jpg?alt=media&token=ac35784c-3a52-4142-a166-e0baaa531147",
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtImgName": "evento-defaut.jpg",
        "evtConditions": "t y c",
        "evtCreated": {
            "_seconds": 1675372355,
            "_nanoseconds": 929000000
        },
        "evtDateTime": {
            "_seconds": 1684530720,
            "_nanoseconds": 0
        },
        "evtSellRrppEnable": true,
        "evtName": "evento prueba",
        "evtEndDate": {
            "_seconds": 1684530720,
            "_nanoseconds": 0
        },
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtDescription": "evento prueba",
        "evtState": "active",
        "id": "ytYmB8FS67BK2nQcIoyw"
    },
    {
        "evtPlace": "Keops",
        "evtProducer": "1",
        "evtCreateUser": "superadm@mailinator.com",
        "evtLastUpdateUser": "superadm@mailinator.com",
        "evtPlaceAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
        "evtInitDate": {
            "_seconds": 1670090520,
            "_nanoseconds": 0
        },
        "evtPlaceId": "lMT7mH5IqQ6ZtRQtWWkF",
        "evtCreated": {
            "_seconds": 1670176950,
            "_nanoseconds": 808000000
        },
        "evtCoordinates": {
            "_latitude": -31.4024536,
            "_longitude": -64.46538029999999
        },
        "evtSellRrppEnable": true,
        "evtSellVerify": false,
        "evtImgPath": "events/1672166113013_KEOPS año nuevo 31-12-22.jpg",
        "evtConditions": "Evento para mayores de 16 años. \nObligatorio presentar DNI para ingresar (físico o Mi Argentina).\nComprando tu anticipada el ingreso es sin limite de horario.\nIngreso con prioridad.",
        "evtName": "KEOPS Año Nuevo - Open Doors 1AM",
        "evtDescription": "Año nuevo en KEOPS. Apertura 1am. Recepción by Mumm. Nueva perspectiva. Reapertura nuevo ingreso. DJ AGUS JUVANY.",
        "evtTitle": "KEOPS Año Nuevo - Open Doors 1AM",
        "evtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/events%2F1672166113013_KEOPS%20an%CC%83o%20nuevo%2031-12-22.jpg?alt=media&token=9ece596c-a793-46dc-8538-7b043f39bd6f",
        "evtImgName": "KEOPS año nuevo 31-12-22.jpg",
        "evtDateTime": {
            "_seconds": 1672541940,
            "_nanoseconds": 0
        },
        "evtEndDate": {
            "_seconds": 1675188120,
            "_nanoseconds": 0
        },
        "evtTags": [
            {
                "isTagVisible": true,
                "tagColor": "#e4c70c",
                "id": "v2UW8fXRZhMlKgKAGRHf",
                "tagName": "VIP"
            }
        ],
        "evtLastUpdate": {
            "_seconds": 1672686830,
            "_nanoseconds": 736000000
        },
        "evtState": "inactive",
        "id": "M6KuuxzJFhRUHI2syqWc"
    }
];

function ManagementEvents() {
  const isMountedRef = useRefMounted();
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshEvents, setRefreshEvents] = useState<boolean>(false);

  const getEvents = () => {
    /* try {
      const response = await axiosCreate.get<{ data: Event[]; status: number }>(
        '/events'
      );
      if (isMountedRef.current) {
        setEvents(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } */

    if (isMountedRef.current) {
      setEvents(fetchEventsDummy);
    }
  };

  useEffect(() => {
    getEvents();
  }, [getEvents, refreshEvents]);

  return (
    <>
      <Helmet>
        <title>Gestión de eventos</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid sx={{ px: 4 }} container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
        <Grid item xs={12}>
          <Results events={events} refresh={setRefreshEvents} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementEvents;
