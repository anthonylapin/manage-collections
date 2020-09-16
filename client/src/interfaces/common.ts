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

export interface ICreateItemPage {
  collectionId: string;
}

export interface IDetailItemPage {
  itemId: string;
}

export interface ICreateItemForm {
  existingTags: string[];
  numericFieldKey1?: string;
  numericFieldKey2?: string;
  numericFieldKey3?: string;
  oneLineFieldKey1?: string;
  oneLineFieldKey2?: string;
  oneLineFieldKey3?: string;
  textFieldKey1?: string;
  textFieldKey2?: string;
  textFieldKey3?: string;
  dateFieldKey1?: string;
  dateFieldKey2?: string;
  dateFieldKey3?: string;
  checkboxFieldKey1?: string;
  checkboxFieldKey2?: string;
  checkboxFieldKey3?: string;
}

export interface IItemFormProps {
  itemForm: ICreateItemForm;
  submitHandler: (itemObj: IItemObj) => void;
  defaultValues: IDefaultItemFormValues;
  header: string;
  buttonName: string;
}

export interface IDefaultItemFormValues {
  name: string;
  tags: string;
  numericField1: number | undefined;
  numericField2: number | undefined;
  numericField3: number | undefined;
  oneLineField1: string | undefined;
  oneLineField2: string | undefined;
  oneLineField3: string | undefined;
  textField1: string | undefined;
  textField2: string | undefined;
  textField3: string | undefined;
  dateField1: Date;
  dateField2: Date;
  dateField3: Date;
  checkboxField1: boolean;
  checkboxField2: boolean;
  checkboxField3: boolean;
}

export interface IItemObj {
  _id?: string;
  name: string;
  tags?: string[];
  created?: Date;
  numericField1?: number;
  numericField2?: number;
  numericField3?: number;
  oneLineField1?: string;
  oneLineField2?: string;
  oneLineField3?: string;
  textField1?: string;
  textField2?: string;
  textField3?: string;
  dateField1?: Date;
  dateField2?: Date;
  dateField3?: Date;
  checkboxField1?: boolean;
  checkboxField2?: boolean;
  checkboxField3?: boolean;
}

export interface IUpdateItemPage {
  collectionId: string;
}

export interface IDeleteItemPage {
  collectionId: string;
}

export interface ISelectForm {
  items: ISelectFormItem[];
  onSelect: (selectedId: string) => void;
  buttonAction: string;
  buttonClass: string;
  target: string;
}

export interface ISelectFormItem {
  _id: string | undefined;
  name: string;
}

export interface ISuccessAlert {
  message: string;
}

export interface ICollection {
  _id?: string;
  name: string;
  owner: string;
  description: string;
  topic: string;
  imageUrl: string;
  created: Date;
}

export interface ICollectionCard {
  collection: ICollection;
  items: IItemObj[];
}

export interface IItemsList {
  items: IItemObj[];
}

export interface ICreateCollection {
  topics: ITopic[];
  handleCreateCollection: (values: ICreateCollectionValues) => void;
}

export interface ICollectionForm {
  onSubmit: (values: ICreateCollectionValues) => void;
  defaultValues: ICollectionFormValues;
  topics: ITopic[];
  buttonAction: string;
}

export interface ICollectionFormValues {
  _id?: string;
  name: string;
  owner: string;
  description: string;
  topic: string;
  numericFieldKey1: string;
  numericFieldKey2: string;
  numericFieldKey3: string;
  oneLineFieldKey1: string;
  oneLineFieldKey2: string;
  oneLineFieldKey3: string;
  textFieldKey1: string;
  textFieldKey2: string;
  textFieldKey3: string;
  dateFieldKey1: string;
  dateFieldKey2: string;
  dateFieldKey3: string;
  checkboxFieldKey1: string;
  checkboxFieldKey2: string;
  checkboxFieldKey3: string;
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

export interface IItemCard {
  item: IItemObj;
  collection: ICollectionFormValues;
  onLike: () => void;
  likes: number;
}

export interface IComment {
  id?: string;
  author: string;
  text: string;
  itemId: string;
  created?: Date;
}

export interface IAddComment {
  onSubmit: (comment: string) => void;
}

export interface ICommentCard {
  comment: IComment;
}

export interface ILike {
  userId: string;
  itemId: string;
}

export interface ISearchForm {
  onSearch: (query: string) => void;
  loading: boolean;
}

export interface ISearchItemPage {
  query: string;
}
