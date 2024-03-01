import { FC } from 'react';

import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

const Dashboard: FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin - Dashboard</title>
      </Helmet>
      <PageTitleWrapper>Dashboard</PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      ></Grid>
      <Footer />
    </>
  );
};

export default Dashboard;
