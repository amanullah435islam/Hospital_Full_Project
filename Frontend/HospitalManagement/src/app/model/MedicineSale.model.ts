
export class PrescribedMedicineDetail {
  medicineName: string | undefined;
  strength: string | undefined;
  quantityPrescribed: number | undefined;
  pricePerUnit: number | undefined;
  subtotal: number | undefined;
}


export class MedicineSale {
  id?: number;
  prescriptionId: number | undefined;
  patientName: string | undefined;
  saleDate: string | undefined; 
  totalAmount: number | undefined;
  paidAmount: any;
  dueAmount: any;
  paymentMethod: string | undefined;
  status: string | undefined;
  soldBy: string | undefined;
  saleId: number | null | undefined;

  medicines: PrescribedMedicineDetail[] | undefined; 
}


