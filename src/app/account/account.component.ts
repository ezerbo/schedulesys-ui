import { AccountService } from './account.service';
import { KeyAndPasswordVM } from './keyandpasswordvm';
import {Message} from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private key: string;
  private action: string;
  title: string;
  btnText: string;
  password: string;
  pwdConfirmation: string;

  msgs: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit() {
    this.route.params
        .subscribe((params: Params) => {
          this.key = params['key'];
          this.action = params['action'];
     });
// TODO Show error message when action is neither 'reset' nor 'activate'
    if (this.action === 'reset') {
        this.title = 'Password reset';
        this.btnText = 'Reset password';
    } else {
        this.title = 'Account activation';
        this.btnText = 'Activate account';
    }

  }

  onCancelBtnClick() {
    this.navigateToLoginPage();
  }

  resetPassword() {
    this.msgs = [];
    this.accountService
      .resetPassword(new KeyAndPasswordVM(this.key, this.password))
      .subscribe(
        response => {
          console.log('Password reset successfully');
          this.msgs.push({
              severity: 'success',
              summary: '',
              detail: 'Password successfully updated, redirecting to login ...'
          });
          setTimeout(() => { this.navigateToLoginPage(); }, 2000)
        },
        error => {
           this.msgs.push({
              severity: 'error',
              summary: 'Something unexpected happenned',
              detail: 'Unable to update password'
          });
        }
       );
  }

  private navigateToLoginPage() {
     this.router.navigate(['']);
  }
}

