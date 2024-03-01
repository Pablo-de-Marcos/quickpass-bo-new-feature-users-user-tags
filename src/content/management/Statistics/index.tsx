import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import PageHeader from './PageHeader';
import Results from './Results';
import axios from 'src/utils/axiosCreate';
import Footer from 'src/components/Footer';
import useRefMounted from 'src/hooks/useRefMounted';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import type { Roles } from 'src/models/roles';

function ManagementRoles() {
  const isMountedRef = useRefMounted();
  const [roles, setRoles] = useState<Roles[]>([]);

  //* Uso este hook para que cuando agregue el rol me traiga los datos sin actualizar la página:
  const [refreshRoles, setRefreshRoles] = useState<boolean>(false);

  //! GET ALL
  const getRoles = useCallback(async () => {
    try {
      const response = await axios.get<{ data: Roles[] }>('/roles');

      if (isMountedRef.current) {
        setRoles(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getRoles();
  }, [getRoles, refreshRoles]); //* Añado la dependencia para que al agregar un rol se muestre el nuevo campo

  return (
    <>
      <Helmet>
        <title>Administrador de estadísticas</title>
      </Helmet>
      <PageTitleWrapper>
        {/*Le paso como props el setRefreshRoles para poder setear el nuevo estado desde la funcion que agrega un rol*/}
        <PageHeader refresh={setRefreshRoles} />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results roles={roles} refresh={setRefreshRoles} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementRoles;
