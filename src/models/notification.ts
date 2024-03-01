export interface Notification {
  tskImmediate: boolean,
  tskParams: {
    title: string,
    body: string
  },
  tskTask: string,
  tskRunDate: {
    _seconds: number,
    _nanoseconds: number
  },
  tskTags: {
    isTagVisible: boolean,
    tagColor: string,
    id: string,
    tagName: string
  }[],
  tskUsersNotified?: {
    proLastName: string,
    proDNI: string,
    proName: string,
    id: string,
    proEmail: string
  }[],
  tskStatus: string,
  id: string
}