import { Component, OnInit } from '@angular/core';
import { ArticleServiceService } from '../article-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  constructor(private articleService: ArticleServiceService, private router: Router) { }

  config: any;
  collection = { count: 60, data: [] };
  ngOnInit(): void {
    this.articleService.articleList().subscribe(res => {
      for(var i=0;  i<res.List.length; i++){
        this.collection.data.push({
          id: i+1,
          title: res.List[i].title,
          body: res.List[i].body,
          author: res.List[i].author
        })
      }
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: res.List.length
      };
    })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
