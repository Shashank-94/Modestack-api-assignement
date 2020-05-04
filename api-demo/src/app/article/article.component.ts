import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleServiceService } from '../article-service.service';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { MatDialog }from '@angular/material/dialog';
import { ArticleDialogComponent } from '../article-dialog/article-dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,
    private articleService: ArticleServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSubmit(form: NgForm){
    this.articleService.createArticle(form).subscribe(res => {
      if(res.Message === 'Article created successfully'){
        let dialogRef = this.dialog.open(ArticleDialogComponent, {data: {Message: 'Article Created Successfully'}});
        dialogRef.afterClosed().subscribe(res => {
          this.router.navigate(['/home']);
        })
      }
    })
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
