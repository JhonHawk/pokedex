import { Component, inject, OnInit, signal } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CardModule } from 'primeng/card';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { countries, profileForm } from '../../../../core/mocks/countries';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { UsernameValidator } from '../../../../core/validators/usernameValidator';
import { ButtonModule } from 'primeng/button';
import { JsonPipe } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ToolbarComponent,
    CardModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    JsonPipe,
    TagModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  countries = countries;
  profileFormSave = profileForm;
  isLoading = false;
  saveForm = signal(undefined);

  profileForm: FormGroup = this.formBuilder.group({
    nickname: ['', Validators.required, UsernameValidator],
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    country: ['', Validators.required],
    state: [''],
  });

  ngOnInit(): void {
    this.profileForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  save() {
    console.log('The form is invalid:', this.profileForm.invalid);
    if (this.profileForm.invalid) return;
    this.isLoading = true;
    this.saveForm.set(this.profileForm.value);
    this.profileFormSave = this.profileForm.value;

    setTimeout(() => {
      this.isLoading = false;
      this.profileForm.reset();
    }, 2000);
  }

  setProfileForm() {
    this.profileForm.setValue(this.profileFormSave);
    this.profileForm.markAsPristine();
    console.table([
      {
        question: '¿El formulario se ha editado?',
        answer: this.profileForm.dirty,
      },
      {
        question: '¿El formulario es válido?',
        answer: this.profileForm.valid,
      },
    ]);
  }
}
