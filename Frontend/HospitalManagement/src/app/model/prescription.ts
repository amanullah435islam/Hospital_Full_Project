export class Prescription{
   id! :number;
    prescriptionCode :number|undefined;

    patientId :number|undefined;
    patientCode :number|undefined;
    patientName :string|undefined;
    age :number|undefined;
    Date :Date|undefined;
    gender :string|undefined;
    phone :string|undefined;
    lastVisit :Date|undefined;

    doctorId :number|undefined;
    doctorCode :number|undefined;
    doctorName :string|undefined;
    specialize :string|undefined;
    contact :string|undefined;
    availability :string|undefined;
    email :string|undefined;
    roomNumber :string|undefined;

    appointmentId :number|undefined;
    appointmentCode :number|undefined;
    date :Date|undefined;
    department :string|undefined;
    status :number|undefined;
    madicleHistry :string|undefined;
    bookingDate :Date|undefined;
    paymentStatus :string|undefined;
prescriptionMedicines: any;
}
