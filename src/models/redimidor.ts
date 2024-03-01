export interface Redimidor {
  rolUsers: {
    proLastName: string,
    id: string,
    proName: string,
    proEmail: string
  }[],
  rolDesc: string,
  rolPermissions: {
    id: string,
    label: string,
    selected: boolean
  }[],
  rolPlaces: {
    plcAddress: string,
    plcCoordinates: {
        _longitude: number,
        _latitude: number
    },
    id: string,
    plcName: string
  }[],
  rolName: string,
  id: string
}