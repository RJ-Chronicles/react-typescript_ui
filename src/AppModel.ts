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
