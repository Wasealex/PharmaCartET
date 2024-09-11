import { apiSlice } from "./apiSlice";

export const medicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedications: builder.query({
      query: () => "/api/medications/all",
      transformResponse: (response) => response.medications,
    }),
    getMedicationById: builder.query({
      query: (id) => `/api/medications/${id}`,
      transformResponse: (response) => response.medication,
    }),
    addMedication: builder.mutation({
      query: (medication) => ({
        url: "/api/medications/add",
        method: "POST",
        body: medication,
      }),
    }),
    updateMedication: builder.mutation({
      query: ({ id, medication }) => ({
        url: `/api/medications/update/${id}`,
        method: "PUT",
        body: medication,
      }),
    }),
    deleteMedication: builder.mutation({
      query: (id) => ({
        url: `/api/medications/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMedicationsQuery,
  useGetMedicationByIdQuery,
  useAddMedicationMutation,
  useUpdateMedicationMutation,
  useDeleteMedicationMutation,
} = medicationApiSlice;
