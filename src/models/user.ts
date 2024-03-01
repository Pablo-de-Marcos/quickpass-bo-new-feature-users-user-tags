export interface User {
  id: string;
  init_date: number,
  last_read: number,
  phoneCode: string;
  proAcceptTerms: number,
  proAcceptWhatsapp: number,
  proBirthDate: string;
  proDNI: string;
  proDniType: number,
  proEmail: string;
  proGender: string;
  proInactiveAccount: number,
  proInstagram: string;
  proLastName: string;
  proLoyalyMember: string;
  proName: string;
  proPhone: string;
  proRoles: any [];
  proRolesRedimidor: any[] | object;
  proSignupState: string;
  proTags: any [];
  proValidatedPhone: string;
  proVerified: number,
  tipo: string;
  proVerificatorUser: string;
  proVerificationTime: string;
  proAccountState: string;
}
