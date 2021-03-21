import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'misterBitcoin';
  faUsers = faUsers;
  faNewspaper = faNewspaper;
  faHome=faHome;

  imageUrl: string = "/assets/img/avatars/"
  imageFormat: string = ".png"


  onButtonGroupClick($event){
    let clickedElement = $event.target || $event.srcElement;
  
    if( clickedElement.nodeName === "A" ) {
  
      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }
  
      clickedElement.className += " active";
    }
  
  }


  currentUser: User;
  user: User = null
  users: User[] = []

    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);

       
        this.userService.user$.subscribe(user => {
          this.user = user
        })


        this.userService.getUsers().subscribe(users => {
          this.users = users
          this.users = this.users.filter(user=> user.name === this.currentUser.name)
          this.user = this.users[0]
          this.userService.getUser(this.user)
        })
      
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
