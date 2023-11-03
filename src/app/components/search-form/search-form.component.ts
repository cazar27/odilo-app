import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { noStrider } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  myForm: FormGroup;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), noStrider]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const username = this.myForm.get('username')?.value;
      this.userDataService.setUsername(username);
      this.searchEvent.emit(username);
    }
  }

}
