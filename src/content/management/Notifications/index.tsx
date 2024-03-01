import { useState, useEffect, useCallback } from 'react';
//import axios from 'src/utils/axios';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';
import type { Notification } from 'src/models/notification';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Results from './Results';
//import axiosCreate from 'src/utils/axiosCreate';

let fetchNotificationsDummy = [
    {
        "tskImmediate": false,
        "tskParams": {
            "title": "Push Agosto",
            "body": "Push automatica Agosto"
        },
        "tskTask": "notify",
        "tskRunDate": {
            "_seconds": 1670272080,
            "_nanoseconds": 0
        },
        "tskTags": [
            {
                "isTagVisible": false,
                "tagColor": "#1fe022",
                "id": "btj2McNknlZ3Rr68aeaP",
                "tagName": "AGOSTO"
            }
        ],
        "tskUsersNotified": [
            {
                "proLastName": "Castro Busico",
                "proDNI": "27550252",
                "proName": "Ariel Alejandro",
                "id": "WaDC7IWKG8grLspY5m84aup6EU03",
                "proEmail": "ariel.castro@gmail.com"
            },
            {
                "proLastName": "Villarroel",
                "proDNI": "40683409",
                "proName": "Lautaro",
                "id": "WaDC7IWKG8grLspY5m84aup6EU04",
                "proEmail": "lautaro.villarroel@gmail.com"
            },
            {
                "proLastName": "Lastname Test",
                "proDNI": "42894003",
                "proName": "Name Test",
                "id": "WaDC7IWKG8grLspY5m84aup6EU05",
                "proEmail": "test.user@gmail.com"
            }
        ],
        "tskStatus": "complete",
        "id": "frbPjNuORM5s8MtBPolP"
    },
    {
        "tskImmediate": false,
        "tskParams": {
            "body": "Push Septiembre",
            "title": "Push automatica Septiembre"
        },
        "tskRunDate": {
            "_seconds": 1670271900,
            "_nanoseconds": 0
        },
        "tskTask": "notify",
        "tskTags": [
            {
                "isTagVisible": false,
                "tagColor": "#9f2828",
                "id": "cRUSu1PtyY8HUkQNOKfY",
                "tagName": "SEPTEIMBRE"
            }
        ],
        "tskStatus": "error",
        "id": "XZKsj0uYlvqSW9ZOV3qU"
    },
    {
        "tskImmediate": false,
        "tskParams": {
            "title": "TEST Notificaciones",
            "body": "TEST Notificaciones descripción"
        },
        "tskTask": "notify",
        "tskRunDate": {
            "_seconds": 1670271600,
            "_nanoseconds": 0
        },
        "tskTags": [],
        "tskStatus": "complete",
        "id": "aa1WkaVdoqTjN5IaHmIa"
    },
    {
        "tskImmediate": true,
        "tskParams": {
            "body": "Inmediata MARZO",
            "title": "Inmediata MARZO"
        },
        "tskTask": "notify",
        "tskRunDate": {
            "_seconds": 1670271483,
            "_nanoseconds": 141000000
        },
        "tskTags": [
            {
                "isTagVisible": false,
                "tagColor": "#9f2828",
                "id": "cRUSu1PtyY8HUkQNOKfY",
                "tagName": "SEPTEIMBRE"
            }
        ],
        "tskStatus": "error",
        "id": "FxUUE5or42BUonKjZvWB"
    },
    {
        "tskImmediate": true,
        "tskParams": {
            "title": "Agosto",
            "body": "Agosto"
        },
        "tskRunDate": {
            "_seconds": 1670271463,
            "_nanoseconds": 816000000
        },
        "tskTask": "notify",
        "tskTags": [
            {
                "isTagVisible": false,
                "tagColor": "#1fe022",
                "id": "btj2McNknlZ3Rr68aeaP",
                "tagName": "AGOSTO"
            }
        ],
        "tskUsersNotified": [
            {
                "proLastName": "Castro Busico",
                "proDNI": "27550252",
                "id": "WaDC7IWKG8grLspY5m84aup6EU03",
                "proName": "Ariel Alejandro",
                "proEmail": "ariel.castro@gmail.com"
            }
        ],
        "tskStatus": "complete",
        "id": "BLqQziz43QDczcWq95tg"
    },
    {
        "tskImmediate": true,
        "tskParams": {
            "title": "Nueva notificacion",
            "body": "Nueva notificacion inmediata"
        },
        "tskRunDate": {
            "_seconds": 1670271443,
            "_nanoseconds": 374000000
        },
        "tskTask": "notify",
        "tskTags": [],
        "tskStatus": "complete",
        "id": "eeiDoowQhuLR23f9s8vN"
    }
];

function ManagementNotifications() {
  const isMountedRef = useRefMounted();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshNotifications, setRefreshNotifications] = useState<boolean>(false);

  const getNotifications = () => {
    /* try {
      const response = await axiosCreate.get<{ data: Notification[]; status: number }>(
        '/notifications'
      );
      if (isMountedRef.current) {
        setNotifications(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } */

    if (isMountedRef.current) {
        setNotifications(fetchNotificationsDummy);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [getNotifications, refreshNotifications]);

  return (
    <>
      <Helmet>
        <title>Gestión de notificaciones</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid sx={{ px: 4 }} container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
        <Grid item xs={12}>
          <Results notifications={notifications} refresh={setRefreshNotifications} />
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
}

export default ManagementNotifications;
