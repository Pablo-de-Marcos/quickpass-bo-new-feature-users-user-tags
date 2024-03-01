export interface Event {
  id: string;
  evtName: string;
  evtTitle: string;
  evtCreated: {
    _seconds: number,
    _nanoseconds: number
  };
  evtState: string;
  evtImgPath: string;
  evtPlaceId: string;
  evtPlace: string;
  evtPlaceAddress: string;
  evtCoordinates: {
    _latitude: number,
    _longitude: number
  };
  evtDateTime: {
    _seconds: number,
    _nanoseconds: number
  };
  evtInitDate: {
    _seconds: number,
    _nanoseconds: number
  };
  evtEndDate: {
    _seconds: number,
    _nanoseconds: number
  };
  evtProducer: string;
  evtDescription: string;
  evtTags: any [];
  evtConditions: string;
  evtCreateUser: string;
  evtLastUpdateUser: string;
  evtLastUpdate: {
    _seconds: number,
    _nanoseconds: number
  };
  evtSellVerify: boolean;
  evtSellRrppEnable: boolean;
  evtImgName: string;
  evtImg: string;
}
