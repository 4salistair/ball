import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { APIService } from './api.service'; 



//**********************************//
// sudo kill $(sudo lsof -t -i:4200)//
//**********************************//


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // scoreSubscription: Subscription = new Subscription;
  // Scores: Score [] = [];

  title = 'Ball';

 constructor(   

  private apiservice: APIService,
 
     
  ) {}

	ngOnInit() {
    
  }


  ngOnDestroy(): void {

  }



}

