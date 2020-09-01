export interface INavbarProps {
  isAuthenticated: boolean;
}

export interface ITopic {
  id: string;
  name: string;
}

export interface ILoginForm {
  loading: boolean;
  onLogin: (email: string, password: string) => void;
}

export interface IRegisterForm {
  loading: boolean;
  onRegister: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}

export interface ILoginFacebook {
  responseFacebook: (res: any) => void;
}

export interface ILoginGoogle {
  responseSuccessGoogle: (res: any) => void;
  responseFailureGoogle: () => void;
}

export interface IAuthContext {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated?: boolean;
}

export interface IProgress {
  percentage: number;
}

export interface ICreateCollection {
  topics: ITopic[];
  handleCreateCollection: (values: ICreateCollectionValues) => void;
}

export interface ICreateCollectionValues {
  name: string;
  topic: string;
  description: string;
  imageUrl?: string;
  numericField1: string;
  numericField2: string;
  numericField3: string;
  oneLineField1: string;
  oneLineField2: string;
  oneLineField3: string;
  textField1: string;
  textField2: string;
  textField3: string;
  dateField1: string;
  dateField2: string;
  dateField3: string;
  checkboxField1: string;
  checkboxField2: string;
  checkboxField3: string;
  file?: Blob | string;
}

export interface ICollectionValues {
  _id: string;
  name: string;
  topic: string;
  description: string;
  imageUrl?: string;
  numericField1?: string;
  numericField2?: string;
  numericField3?: string;
  oneLineField1?: string;
  oneLineField2?: string;
  oneLineField3?: string;
  textField1?: string;
  textField2?: string;
  textField3?: string;
  dateField1?: string;
  dateField2?: string;
  dateField3?: string;
  checkboxField1?: string;
  checkboxField2?: string;
  checkboxField3?: string;
}

export interface ICollectionTable {
  collections: ICollectionValues[];
}

export interface ICollectionDetailParams {
  id: string;
}
