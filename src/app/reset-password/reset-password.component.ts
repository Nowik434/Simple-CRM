import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  errorMessage;

  constructor(public http: HttpClient) {}

  LoginForm = new FormGroup({
    email: new FormControl(this.LoginForm, [
      Validators.required,
      Validators.email
    ])
  });

  ngOnInit() {}

  onSubmit() {
    console.log(this.LoginForm.value.email);
    console.log();
    this.http
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyCyKphftMCyMzRtKSVjor1a0EI8Mmy4gWE",
        {
          kind: "identitytoolkit#GetOobConfirmationCodeResponse",
          email: this.LoginForm.value.email,
          requestType: "PASSWORD_RESET"
        }
      )
      .subscribe(
        resData => {
          console.log(resData);
        },
        error => {
          console.log(error.error.error.message);
          switch (error.error.error.message) {
            case "INVALID_EMAIL":
              this.errorMessage = "Nieprawidłowy adres email";
              break;
          }
        }
      );
  }
}
