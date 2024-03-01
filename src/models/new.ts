export interface New {
  nvtNameImg?: string,
  nvtNotify: boolean,
  nvtDate: {
    _seconds: number,
    _nanoseconds: number
  },
  nvtDiffusion: string,
  nvtNotificationId?: string,
  nvtImg?: string,
  nvtTitle: string,
  nvtDescription: string,
  nvtPathImg?: string,
  id: string
}