import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-medic',
  templateUrl: './form-medic.component.html',
  styleUrls: ['./form-medic.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormMedicComponent implements OnInit {
  group: FormGroup;

  constructor(
    private reference: MatDialogRef<FormMedicComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    if (this.data.action === 'new') {
      this.group = new FormGroup({
        name: new FormControl(null, Validators.required),
        cmp: new FormControl(null, Validators.pattern(/[0-9]{5}/)),
      });
    } else {
      this.group = new FormGroup({
        _id: new FormControl(this.data.medic._id),
        name: new FormControl(this.data.medic.name, Validators.required),
        cmp: new FormControl(
          this.data.medic.cmp,
          Validators.pattern(/[0-9]{5}/)
        ),
      });
    }
  }

  execute(event): void {
    event.preventDefault();
    if (this.group.valid) {
      this.reference.close({
        action: this.data.action,
        data: this.group.value,
      });
    }
  }
}
