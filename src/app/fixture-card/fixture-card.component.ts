import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fixture  } from '../fixture.model';
import { Subscription } from 'rxjs';
import { APIService } from '../api.service'; 
import { DatePipe } from '@angular/common'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-fixture-card',
  templateUrl: './fixture-card.component.html',
  styleUrls: ['./fixture-card.component.css']
})
export class FixtureCardComponent implements OnInit,OnDestroy {

 Fixtures: Fixture [] = [];
 fixureSubscription: Subscription = new Subscription;

 champFixtures: Fixture [] = [];
 champFixureSubscription: Subscription = new Subscription;

 leagueOneFixtures: Fixture [] = [];
 leagueOneFixureSubscription: Subscription = new Subscription;

 leagueTwoFixtures: Fixture [] = [];
 leagueTwoFixureSubscription: Subscription = new Subscription;

//
pickedfixureSubscription: Subscription = new Subscription;
pickedFixtures: Fixture [] = [];
//

 toDateString: string | undefined
 fromDateString: string | undefined
 dayString : string | undefined 

 daysUnilSaturday: number | undefined 
 nextSaturday: Date  | undefined

  constructor(

    private apiservice: APIService,
    private db: AngularFirestore,
    public datepipe: DatePipe,
    


  ) { 
   this.teamsAlreadypicked()
   
  }

  ngOnInit(): void {
  
    //Today 
    // this.dayString = 'Date'+this.datepipe.transform(Date(), 'yyyy-MM-dd');
    // this.toDateString = 'to='+this.datepipe.transform(Date(), 'yyyy-MM-dd');
    // this.fromDateString = 'from='+this.datepipe.transform(Date(), 'yyyy-MM-dd');
    
    // next Saturday 
    const d = new Date() 
    this.daysUnilSaturday =  6 - d.getDay()
    this.nextSaturday  = new Date(d.setDate(d.getDate() + this.daysUnilSaturday ))

    const nextSaturdayToDateString = 'to='+this.datepipe.transform( this.nextSaturday,'yyyy-MM-dd' )
    const nextSaturdayFromDateString = 'from='+this.datepipe.transform( this.nextSaturday,'yyyy-MM-dd' )
   

    this.fixureSubscription = this.apiservice.premFixuresChanged$.subscribe(
        fixture => {(this.Fixtures = fixture) })
    

    this.champFixureSubscription = this.apiservice.champFixuresChanged$.subscribe(
        fixture => {(this.champFixtures = fixture) })
      
 
    this.leagueOneFixureSubscription = this.apiservice.leaugeOneFixuresChanged$.subscribe(
        fixture => {(this.leagueOneFixtures = fixture)    })
              
    this.champFixureSubscription = this.apiservice.leaugeTwoFixuresChanged$.subscribe(
        fixture => {(this.leagueTwoFixtures = fixture)} )
    


      this.apiservice.apiCall('league=39', 'season=2022', nextSaturdayFromDateString  , nextSaturdayToDateString  )
      this.apiservice.apiCall('league=40', 'season=2022', nextSaturdayFromDateString  , nextSaturdayToDateString   )
      this.apiservice.apiCall('league=41', 'season=2022', nextSaturdayFromDateString  , nextSaturdayToDateString   )
      this.apiservice.apiCall('league=42', 'season=2022', nextSaturdayFromDateString  , nextSaturdayToDateString  )
   
      


  }

  ngOnDestroy(): void {
    this.fixureSubscription.unsubscribe
    this.champFixureSubscription.unsubscribe
    this.leagueOneFixureSubscription.unsubscribe
    this.leagueOneFixureSubscription.unsubscribe
  }


  teamClick(GameID:string, homeTeamNumber:any , awayTeamNumber:any, pickedTeam:any,leagueID: any ): void {
      
    this.apiservice.teamClick(GameID, homeTeamNumber , awayTeamNumber, pickedTeam, leagueID);
  
  }

  teamsAlreadypicked(){
    this.pickedfixureSubscription = this.apiservice.trackedFixturesChanged$.subscribe(
      fixture => { ( this.pickedFixtures = fixture ) })
    this.apiservice.getGameIDs()
  }
}

      // import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
      // import { Router } from '@angular/router';

      // private router: Router
      // this.db.collection('game'+this.dayString).add({
      // GameID: GameID });
      // this.apiservice.apiCall('league=40', 'season=2022', this.fromDateString , this.toDateString)
      // this.apiservice.apiSubscriptionCall()