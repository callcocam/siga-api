import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private redirectAfterLogout = ["/admin/auth"];

  @Input() classes = ""
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    setTimeout(this.logout(),5000)
  }
  logout() {
    this.authService.logout();
    this.router.navigate(this.redirectAfterLogout);
  }
}
