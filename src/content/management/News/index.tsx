import { useState, useEffect, useCallback } from 'react';
//import axios from 'src/utils/axios';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';
import type { New } from 'src/models/new';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Results from './Results';
//import axiosCreate from 'src/utils/axiosCreate';

let fetchNewsDummy = [
    {
        "nvtNotify": false,
        "nvtDate": {
            "_seconds": 1709931600,
            "_nanoseconds": 0
        },
        "nvtDiffusion": "public",
        "nvtTitle": "Apertura de nueva pista en Keops",
        "nvtDescription": "Descripcion apertura de nueva pista en Keops",
        "id": "2usaecvRd0obqwasjwsy"
    },
    {
        "nvtNotify": true,
        "nvtDate": {
            "_seconds": 1709409600,
            "_nanoseconds": 0
        },
        "nvtDiffusion": "private",
        "nvtNotificationId": "5L6forC3BdIBYjzlSQ8r",
        "nvtTitle": "Segunda novedad TEST",
        "nvtDescription": "Segunda novedad TEST descripción",
        "id": "9wK8pXLQvey3TEDfTB6e"
    },
    {
        "nvtNameImg": "Captura de pantalla 2024-02-28 105353.png",
        "nvtNotify": true,
        "nvtDate": {
            "_seconds": 1709316000,
            "_nanoseconds": 0
        },
        "nvtDiffusion": "public",
        "nvtNotificationId": "DdM2x52yfjo0EavbD06O",
        "nvtImg": "https://firebasestorage.googleapis.com/v0/b/keops-dev.appspot.com/o/news%2F1709231350588_Captura%20de%20pantalla%202024-02-28%20105353.png?alt=media&token=580f4c7b-26b7-4efb-94e6-6f306311d6b9",
        "nvtTitle": "Primera novedad TEST",
        "nvtDescription": "Primera novedad TEST descripción",
        "nvtPathImg": "news/1709231350588_Captura de pantalla 2024-02-28 105353.png",
        "id": "oCntL0vxaxx3t70SkIeH"
    }
];

function ManagementNews() {
  const isMountedRef = useRefMounted();
  const [news, setNews] = useState<New[]>([]);
  const [refreshNews, setRefreshNews] = useState<boolean>(false);

  const getNews = () => {
    /* try {
      const response = await axiosCreate.get<{ data: New[]; status: number }>(
        '/news'
      );
      if (isMountedRef.current) {
        setNews(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } */

    if (isMountedRef.current) {
      setNews(fetchNewsDummy);
    }
  };

  useEffect(() => {
    getNews();
  }, [getNews, refreshNews]);

  return (
    <>
      <Helmet>
        <title>Gestión de Novedades</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid sx={{ px: 4 }} container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
        <Grid item xs={12}>
          <Results news={news} refresh={setRefreshNews} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementNews;
