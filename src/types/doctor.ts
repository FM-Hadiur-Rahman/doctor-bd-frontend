export type Doctor = {
  _id: string;
  bmdcNumber: string;
  specialization: string;
  chamberName: string;
  district: string;
  address: string;
  consultationFee: number;
  availableSlots?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  isVerified: boolean;
  mapAddress?: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  user?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
};
