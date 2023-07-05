export interface Headers {
  headers: {
    Authorization: string;
  };
}

export interface Battery {
  name: string;
}

export interface BatteryPayload {
  message: string;
  list: [
    {
      name: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
}

export interface AmpherePayload {
  message: string;
  list: [
    {
      size: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
}

export interface Stock {
  battery_name: string;
  product_code: string;
  amphere_size: string;
  quantity: number;
  mrp: number;
}
export interface StockElementsPayload {
  message: string;
  list: [
    {
      battery_name: string;
      product_code: string;
      amphere_size: string;
      quantity: number;
      mrp: number;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
}

export interface Amphere {
  size: string;
}

export interface GSTPayload {
  message: string;
  list: [
    {
      gst: number;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
}

export interface BillingPayload {
  message: string;
  list: [
    {
      total_amount: number;
      bill_status: string;
      unpaid_amount: number;
      gst: number;
      gst_amount: number;
      customer: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
}
export interface GST {
  gst: number;
}

export interface Billing {
  bill_status: string;
  unpaid_amount: string | number;
}
