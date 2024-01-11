export interface User {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  deleted: boolean;
}
export interface UserLoggedIn {
  user: User;
  token: string;
  expiration: string | any;
}
export interface FormProps {
  initial_data: {};
  mode: string;
  title: string;
}

export interface DeleteModalProps {
  id: string;
  mode: string;
  title: string;
}

export interface StoredCartItemsProps {
  GST: string;
  customer: string;
  name: string;
  price: string;
  serial_number: string;
  type: string;
  vehicle_name: string;
  vehicle_number: string;
}

export interface AmphareSize {
  _id: string;
  size: number;
  createdAt: string;
}

export interface BatteryNameValues {
  _id: string;
  name: number;
  createdAt: string;
}

export interface GSTValues {
  _id: string;
  gst: number;
  createdAt: string;
}

export interface State {
  token: string | undefined;
  user: User;
  loggedIn: UserLoggedIn;
  GST: GSTValues[];
  batteryNames: BatteryNameValues[];
  amphere: AmphareSize[];
  storedCartItems: StoredCartItemsProps;
  deleteModalFormProps: DeleteModalProps;
  formProps: FormProps;
  refreshEffect: boolean;
  isLoggedIn: boolean;
  isModalVisible: boolean;
  isDeleteModalVisible: boolean;
  error: { hasError: boolean; message: string };
  isLoading: boolean;
}

export const initialUser: User = {
  _id: "",
  name: "",
  last_name: "",
  email: "",
  role: "",
  createdBy: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
  deleted: false,
};

export const initialFormProps: FormProps = {
  initial_data: {},
  mode: "",
  title: "",
};

export const initialDeleteFormProps: DeleteModalProps = {
  id: "",
  mode: "",
  title: "",
};

export const initialStoredCartItems: StoredCartItemsProps = {
  GST: "",
  customer: "",
  name: "",
  price: "",
  serial_number: "",
  type: "",
  vehicle_name: "",
  vehicle_number: "",
};

export const initialAmphere: AmphareSize[] = [
  {
    _id: "",
    size: 0,
    createdAt: "",
  },
];

export const initialBatteryNames: BatteryNameValues[] = [
  {
    _id: "",
    name: 0,
    createdAt: "",
  },
];

export const initialGST: GSTValues[] = [
  {
    _id: "",
    gst: 0,
    createdAt: "",
  },
];

export const initialUserLoggedIn: UserLoggedIn = {
  user: initialUser,
  token: "",
  expiration: "",
};
