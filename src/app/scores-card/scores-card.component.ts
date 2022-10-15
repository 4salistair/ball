import { Component, OnInit } from '@angular/core';
import { Fixture  } from '../fixture.model';
import { Subscription, Subject } from 'rxjs';
import { APIService } from '../api.service'; 
import { Score } from '../score.model';

@Component({
  selector: 'app-scores-card',
  templateUrl: './scores-card.component.html',
  styleUrls: ['./scores-card.component.css']
})


export class ScoresCardComponent implements OnInit {

  pickedFixtures: Fixture [] = [];
  pickedfixureSubscription: Subscription = new Subscription;
 

  scoreSubscription: Subscription = new Subscription;
  Scores: Score [] = [];

  constructor(
    private apiservice: APIService,
  ) {
  }

  ngOnInit(): void {

    this.pickedfixureSubscription = this.apiservice.fixuresChanged$.subscribe(
      fixture => { ( this.pickedFixtures = fixture )
        this.consoleloger(this.pickedFixtures) }  )

    this.scoreSubscription = this.apiservice.scoresChanged$.subscribe(
    fixture => {(this.Scores = fixture)
    })
    this.apiservice.resultCall()

  }


  consoleloger(GameID:any): void {
   // this.consoleloger(this.pickedFixtures)
  }
}
