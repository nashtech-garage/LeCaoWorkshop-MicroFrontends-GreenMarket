import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form-app',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  submitted!: boolean;

  contactForm = this.formBuilder.group({
    yourName: ['', Validators.required],
    yourEmail: ['', [Validators.required, Validators.email]],
    yourMessage: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid) {
      let yourName = this.contactForm.getRawValue().yourName;
      let yourEmail = this.contactForm.getRawValue().yourEmail;
      let yourMessage = this.contactForm.getRawValue().yourMessage;
      
      //Submit value

      this.contactForm.reset();
    }
  }

  get contactFormControl() {
    return this.contactForm.controls;
  }
}
