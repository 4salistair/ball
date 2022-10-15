import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fixture  } from '../fixture.model';
import { Subscription, Subject } from 'rxjs';
import { APIService } from '../api.service'; 
import { DatePipe } from '@angular/common'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';



@Component({
  selector: 'app-prem-card',
  templateUrl: './prem-card.component.html',
  styleUrls: ['./prem-card.component.css']
})
export class PremCardComponent implements OnInit,OnDestroy {

 Fixtures: Fixture [] = [];
 fixureSubscription: Subscription = new Subscription;

 

 toDateString: string | undefined;
 fromDateString: string | undefined;
 dayString : string | undefined 

   

  constructor(

    private apiservice: APIService,
    private db: AngularFirestore,
    public datepipe: DatePipe

  ) { 

   
  }

  ngOnInit(): void {
  
     
   this.dayString = 'Date'+this.datepipe.transform(Date(), 'yyyy-MM-dd');
  this.toDateString = 'to='+this.datepipe.transform(Date(), 'yyyy-MM-dd');
   this.fromDateString = 'from='+this.datepipe.transform(Date(), 'yyyy-MM-dd');

  //  this.toDateString ='gameDate'+'2022-10-10';
  //  this.fromDateString = 'gameDate'+'2022-10-10';

    this.fixureSubscription = this.apiservice.fixuresChanged$.subscribe(
      fixture => (this.Fixtures = fixture))
      
      this.apiservice.apiCall('league=39', 'season=2022', this.fromDateString , this.toDateString)
      //this.apiservice.apiCall('league=40', 'season=2022', this.fromDateString , this.toDateString)
      //this.apiservice.apiSubscriptionCall()

       
  }

  ngOnDestroy(): void {
    this.fixureSubscription.unsubscribe
  }


  teamClick(GameID:string, homeTeamNumber:any , awayTeamNumber:any, pickedTeam:any ): void {

      this.apiservice.teamClick(GameID, homeTeamNumber , awayTeamNumber, pickedTeam);
      // this.db.collection('game'+this.dayString).add({
      // GameID: GameID });
  }


}
