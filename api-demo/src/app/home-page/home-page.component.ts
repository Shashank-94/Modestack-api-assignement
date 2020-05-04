import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  name:String;

  ngOnInit(): void {
    this.name = sessionStorage.userName;
  }

  createArticle(){
    this.router.navigate(['/article']);
  }

  articleList(){
    this.router.navigate(['/articleList']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
