export class Transaction{
    id?: number;
    transactionCode :number|undefined;
    patientId :number|undefined;
    labTestId :number|undefined;
    prescriptionId :number|undefined;
    invoiceNumber :string|undefined;
    testName :string|undefined;
    lastVisit :Date|undefined;
    testPrice :number|undefined;
    discount :number|undefined;
    debitAmount :number|undefined;
    creditAmount :number|undefined;
    paymentMode :String|undefined;
    paymentDate :Date|undefined;
    status :String|undefined;
    remarks :String|undefined;
 
}
