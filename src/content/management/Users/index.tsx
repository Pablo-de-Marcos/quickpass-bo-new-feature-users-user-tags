import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Grid } from '@mui/material';
import useRefMounted from 'src/hooks/useRefMounted';
import type { User } from 'src/models/user';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Results from './Results';
//import axiosCreate from 'src/utils/axiosCreate';

const fetchUsersDummy = [
    {
        "id": "s9JM1nPEAfN6zJkolOMi72Fzyd52",
        "init_date": 1689092519,
        "last_read": 1689092519,
        "phoneCode": null,
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": null,
        "proDniType": 1,
        "proEmail": "testkeps@mailinator.com",
        "proGender": "female",
        "proInactiveAccount": 0,
        "proInstagram": null,
        "proLastName": "dasdasd",
        "proLoyalyMember": null,
        "proName": "adsada",
        "proPhone": "35121234567",
        "proRoles": [],
        "proRolesRedimidor": [],
        "proSignupState": null,
        "proTags": [],
        "proValidatedPhone": null,
        "proVerified": 0,
        "tipo": "user",
        "proVerificatorUser": null,
        "proVerificationTime": null,
        "proAccountState": null
    },
    {
        "id": "ITxCl2WFpIevFitxM1q9TGkZD9c2",
        "init_date": 1675110485,
        "last_read": 1675110485,
        "phoneCode": "880965",
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 1,
        "proBirthDate": null,
        "proDNI": null,
        "proDniType": null,
        "proEmail": "rrpp2@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": "rrpp2",
        "proLastName": "mailinator ",
        "proLoyalyMember": null,
        "proName": "rrpp2",
        "proPhone": "3512345678",
        "proRoles": [
            {
                "id": "Rrpp"
            }
        ],
        "proRolesRedimidor": {},
        "proSignupState": "complete",
        "proTags": [],
        "proValidatedPhone": "3512345678",
        "proVerified": 1,
        "tipo": "user",
        "proVerificatorUser": "superadm@mailinator.com",
        "proVerificationTime": "2023-03-27T18:16:12.000Z",
        "proAccountState": null
    },
    {
        "id": "SdQfVSTZjsdZYMKQJ9yg0z5lE1F2",
        "init_date": 1673821286,
        "last_read": 1673821491,
        "phoneCode": "255968",
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": "24",
        "proDniType": 1,
        "proEmail": "24@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": "24",
        "proLastName": "mailinator ",
        "proLoyalyMember": null,
        "proName": "24",
        "proPhone": "3512345678",
        "proRoles": [],
        "proRolesRedimidor": [],
        "proSignupState": "complete",
        "proTags": [],
        "proValidatedPhone": "3512345678",
        "proVerified": 0,
        "tipo": "user",
        "proVerificatorUser": "superadm@mailinator.com",
        "proVerificationTime": null,
        "proAccountState": null
    },
    {
        "id": "0MpKxdgof3Oi5mlDr67XBHcI2Pr1",
        "init_date": 1673820793,
        "last_read": 1673820981,
        "phoneCode": "253456",
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": "23",
        "proDniType": 1,
        "proEmail": "23@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": "23",
        "proLastName": "mailinator ",
        "proLoyalyMember": null,
        "proName": "23",
        "proPhone": "3512345678",
        "proRoles": [],
        "proRolesRedimidor": [],
        "proSignupState": "complete",
        "proTags": [
            {
                "id": "v2UW8fXRZhMlKgKAGRHf",
                "tagName": "VIP",
                "tagColor": "#e4c70c",
                "isTagVisible": true
            }
        ],
        "proValidatedPhone": "3512345678",
        "proVerified": 0,
        "tipo": "user",
        "proVerificatorUser": "superadm@mailinator.com",
        "proVerificationTime": null,
        "proAccountState": null
    },
    {
        "id": "qpEIhMqjAbbSas55FI3B7YZ5zEe2",
        "init_date": 1673820325,
        "last_read": 1673820325,
        "phoneCode": null,
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": "22",
        "proDniType": 1,
        "proEmail": "22@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": "22",
        "proLastName": "mailinator ",
        "proLoyalyMember": null,
        "proName": "22",
        "proPhone": "3512345678",
        "proRoles": [],
        "proRolesRedimidor": [],
        "proSignupState": null,
        "proTags": [],
        "proValidatedPhone": null,
        "proVerified": 1,
        "tipo": null,
        "proVerificatorUser": "superadm@mailinator.com",
        "proVerificationTime": "2023-03-27T20:03:21.000Z",
        "proAccountState": null
    },
    {
        "id": "ySX6wXZeZpZbjSNkfVEOGLl7ITK2",
        "init_date": 1673819811,
        "last_read": 1673819811,
        "phoneCode": "543442",
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": "19",
        "proDniType": 1,
        "proEmail": "19@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": "19",
        "proLastName": "mailinator",
        "proLoyalyMember": null,
        "proName": "19",
        "proPhone": "3212345678",
        "proRoles": [],
        "proRolesRedimidor": [],
        "proSignupState": "complete",
        "proTags": [
            {
                "tagName": "VERIFICADO",
                "tagColor": "#1fe022",
                "isTagVisible": true
            },
            {
                "id": "v2UW8fXRZhMlKgKAGRHf",
                "tagName": "VIP",
                "tagColor": "#e4c70c",
                "isTagVisible": true
            }
        ],
        "proValidatedPhone": "3212345678",
        "proVerified": 1,
        "tipo": "user",
        "proVerificatorUser": "superadm@mailinator.com",
        "proVerificationTime": "2023-03-27T23:56:07.000Z",
        "proAccountState": null
    },
    {
        "id": "Bh0QohuX6tWzSE8r8PSkPBIJJDL2",
        "init_date": 1673732818,
        "last_read": 1673732818,
        "phoneCode": "500053",
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": "20",
        "proDniType": 1,
        "proEmail": "20@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": "20",
        "proLastName": "mailinator ",
        "proLoyalyMember": null,
        "proName": "20",
        "proPhone": "3512345678",
        "proRoles": [],
        "proRolesRedimidor": [],
        "proSignupState": "complete",
        "proTags": [],
        "proValidatedPhone": "3512345678",
        "proVerified": 0,
        "tipo": "user",
        "proVerificatorUser": null,
        "proVerificationTime": null,
        "proAccountState": null
    },
    {
        "id": "TxgNazPbmCOc3TzrsFWSj2tmnvJ2",
        "init_date": 1670270659,
        "last_read": 1670270659,
        "phoneCode": "317693",
        "proAcceptTerms": 1,
        "proAcceptWhatsapp": 0,
        "proBirthDate": null,
        "proDNI": null,
        "proDniType": 1,
        "proEmail": "guardia@mailinator.com",
        "proGender": null,
        "proInactiveAccount": 0,
        "proInstagram": null,
        "proLastName": "mailinator ",
        "proLoyalyMember": null,
        "proName": "guardia",
        "proPhone": "3516508432",
        "proRoles": [
            {
                "id": "Redimidor"
            }
        ],
        "proRolesRedimidor": {
            "aMLCVQrF91ZOa5HSEH2A": {
                "rolDesc": "Guardia que redime solo entradas",
                "rolName": "Guardia de Entradas",
                "rolPlaces": [
                    {
                        "id": "lMT7mH5IqQ6ZtRQtWWkF",
                        "plcName": "Keops",
                        "plcAddress": "Roque Sáenz Peña Centro, Villa Carlos Paz, Córdoba, Argentina",
                        "plcCoordinates": {
                            "_latitude": -31.4024536,
                            "_longitude": -64.46538029999999
                        }
                    }
                ],
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
                        "id": "Ticket",
                        "label": "Control Ticket",
                        "selected": true
                    }
                ]
            }
        },
        "proSignupState": "complete",
        "proTags": [],
        "proValidatedPhone": "3516508432",
        "proVerified": 1,
        "tipo": "user",
        "proVerificatorUser": "superadm@mailinator.com",
        "proVerificationTime": "2022-12-08T17:10:33.000Z",
        "proAccountState": null
    },
];

function ManagementEvents() {
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState<User[]>([]);
  const [refreshUsers, setRefreshUsers] = useState<boolean>(false);

  const getUsers = () => {
    /* try {
      const response = await axiosCreate.get<{ data: User[]; status: number }>(
        '/users'
      );
      if (isMountedRef.current) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } */

    if (isMountedRef.current) {
      setUsers(fetchUsersDummy);
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers, refreshUsers]);

  return (
    <>
      <Helmet>
        <title>Gestión de usuarios</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Results users={users} refresh={setRefreshUsers} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ManagementEvents;
