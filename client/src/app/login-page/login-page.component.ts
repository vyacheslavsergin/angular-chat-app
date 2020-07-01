import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required]
      ),
      room: new FormControl(
        null,
        [Validators.required, Validators.minLength(5)]
      )
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.router.navigate(['/chat'], {
      queryParams: {
        name: this.form.value.name,
        room: this.form.value.room
      }
    });
  }

}
