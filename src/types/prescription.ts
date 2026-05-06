export type Medicine = {
  name: string;
  dosage: string;
  duration: string;
  instructions?: string;
};

export type Prescription = {
  _id: string;
  diagnosis: string;
  medicines: Medicine[];
  advice?: string;
  followUpDate?: string;
  pdfUrl?: string;
  createdAt: string;
};
