import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestList } from 'src/app/model/TestList.model';
import { TestViewService } from 'src/app/service/test-view.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lab-test',
  templateUrl: './add-lab-test.component.html',
  styleUrls: ['./add-lab-test.component.css']
})
export class AddLabTestComponent implements OnInit {
 testLists: TestList[] = [];
   addForm!: FormGroup;
 
   // form label states
   formLabel = 'Add TestList';
   saveMode = true;          // true = save, false = update
 
   constructor(
     private fb: FormBuilder,
     private TestListSvc: TestViewService
   ) {}
 
   ngOnInit(): void {
     this.buildForm();
     this.loadTestLists();
   }
 
   private buildForm() {
     this.addForm = this.fb.group({
       id: [],
       testCode: [0, Validators.required],
       testName: ['', Validators.required],
       testType: ['', Validators.required],
       price: [0, Validators.required],        // string
       unit: ['', Validators.required],
       normalRange: ['', [Validators.required, Validators.maxLength(11)]],
       result: ['', Validators.required]    // string
     });
   }
 
   private loadTestLists() {
     this.TestListSvc.getTestListss().subscribe(res => (this.testLists = res));
   }
 
   // ---------- CRUD ----------
   addTestList() {
     if (this.addForm.invalid) return;
      Swal.fire({
                 title: "Add Successful",
                 icon: "success",
                 draggable: true
               });
         
     const TestList: TestList = this.addForm.value;
     this.TestListSvc.add(TestList).subscribe(() => {
       this.loadTestLists();
       this.addForm.reset();
     });
   }
 
   editTestList(p: TestList) {
     this.saveMode = false;
     this.formLabel = 'Edit TestList';
     this.addForm.patchValue(p);
   }
 
   updateTestList() {
     if (this.addForm.invalid) return;
 
      Swal.fire({
                 title: "Update Successful",
                 icon: "success",
                 draggable: true
               });

     const TestList: TestList = this.addForm.value;
     this.TestListSvc.update(TestList).subscribe(() => {
       this.saveMode = true;
       this.formLabel = 'Add TestList';
       this.addForm.reset();
       this.loadTestLists();
     });
   }
 
   deleteTestList(p: TestList) {
     if (!p.id) return;
      Swal.fire({
                 title: "Delete Successful",
                 icon: "success",
                 draggable: true
               });

     this.TestListSvc.delete(p.id).subscribe(() => {
       this.testLists = this.testLists.filter(x => x.id !== p.id);
     });
   }
 }
 
 