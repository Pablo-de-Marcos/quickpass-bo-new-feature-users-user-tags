import { Box, Card, Typography, Container, styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import useAuth from 'src/hooks/useAuth';
import FirebaseAuthLogin from '../LoginFirebaseAuth';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

function LoginBasic() {
  const { method } = useAuth() as any;
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Inicio de sesión</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm" sx={{ alignSelf: 'center' }}>
            <Logo />
            <Card
              sx={{
                mt: 3,
                px: 4,
                pt: 5,
                pb: 3,
                mb: 7
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Inicio de sesión')}
                </Typography>
              </Box>
              {method === 'Firebase' && <FirebaseAuthLogin />}
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
     
      <div style={{height:'1000px' , 
                      width: '100%'}}> 
            <iframe src="http://localhost:3001/events" frameBorder="0"
                    style={{height:'1000px' , 
                          width: '100%'}}></iframe>
      </div>     
      
    </>
  );
}

export default LoginBasic;
