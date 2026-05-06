import api from "./api";

export const appointmentDocumentService = {
  getByAppointment: (appointmentId: string) => {
    return api.get(`/appointment-documents/${appointmentId}`);
  },

  upload: (
    appointmentId: string,
    payload: {
      document: File;
      documentType: string;
      note?: string;
    },
  ) => {
    const formData = new FormData();

    formData.append("document", payload.document);
    formData.append("documentType", payload.documentType);

    if (payload.note) {
      formData.append("note", payload.note);
    }

    return api.post(`/appointment-documents/${appointmentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: (
    documentId: string,
    payload: {
      doctorNote?: string;
      isImportant?: boolean;
    },
  ) => {
    return api.patch(`/appointment-documents/document/${documentId}`, payload);
  },

  delete: (documentId: string) => {
    return api.delete(`/appointment-documents/document/${documentId}`);
  },
};
