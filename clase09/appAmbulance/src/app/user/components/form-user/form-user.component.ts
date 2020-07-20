import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../../models/user.interface';
import { RoleService } from '../../../services/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../../models/role.interface';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormUserComponent implements OnInit {
  title: string;
  group: FormGroup;
  listRoles: Observable<Role[]>;
  isDraging = false;
  fileSelected: File;

  @ViewChild('showPicUser') showPicUser: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private reference: MatDialogRef<FormUserComponent>,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.title = this.data ? 'Edit' : 'New';

    this.group = new FormGroup({
      name: new FormControl(this.data?.name, Validators.required),
      email: new FormControl(this.data?.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null),
      _id: new FormControl(this.data?._id),
      roles: new FormControl(this.data?.roles[0]._id, Validators.required),
      photo: new FormControl(null),
    });

    if (!this.data) {
      this.group.get('password').setValidators(Validators.required);
    } else {
      this.group.get('email').disable();
    }

    this.list();
  }

  save(): void {
    if (this.group.valid) {
      if (this.fileSelected) {
        this.group.patchValue({ photo: this.fileSelected });
      }
      const user: User = this.group.getRawValue();
      this.reference.close(user);
    }
  }

  list(): void {
    this.listRoles = this.roleService.list();
  }

  draging(isDrag: boolean): void {
    this.isDraging = isDrag;
  }

  receivingFile(files: FileList): void {
    const fileType = files[0].type;
    const fileIsValid = fileType.startsWith('image/');

    if (!fileIsValid) {
      this.showPicUser.nativeElement.style.backgroundImage = 'none';
      this.showPicUser.nativeElement.innerText = 'Not image';
      return;
    }

    this.fileSelected = files[0];

    const fr: FileReader = new FileReader();
    fr.onloadend = (response) => {
      const data = (response.target as FileReader).result;
      this.showPicUser.nativeElement.style.backgroundImage = `url('${data}')`;
      this.showPicUser.nativeElement.innerText = '';
    };
    fr.readAsDataURL(files[0]);
  }

  onUpload(): void {
    this.inputFile.nativeElement.click();
  }
}
