import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fixture  } from '../fixture.model';
import { Subscription, Subject } from 'rxjs';
import { APIService } from '../api.service'; 
import { DatePipe } from '@angular/common'
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-champ-card',
  templateUrl: './champ-card.component.html',
  styleUrls: ['./champ-card.component.css']
})


export class ChampCardComponent implements OnInit {

  champFixtures: Fixture [] = [];
  champfixureSubscription: Subscription = new Subscription;

  toDateString: string | undefined;
  fromDateString: string | undefined;

  constructor(

    private apiservice: APIService,
    private db: AngularFirestore,
    public datepipe: DatePipe

  ) { }

  ngOnInit(): void {

    // this.toDateString = 'to='+this.datepipe.transform(Date(), 'yyyy-MM-dd');
    // this.fromDateString = 'from='+this.datepipe.transform(Date(), 'yyyy-MM-dd');

    // this.champfixureSubscription = this.apiservice.champfixuresChanged$.subscribe(
    //   champFixture => (this.champFixtures = champFixture ))

    //  this.apiservice.apiCall('league=40', 'season=2022', this.fromDateString , this.toDateString )
 
    //   console.log('inChampCom')
    //   console.log(this.champFixtures)
 
  }

  teamClick(GameID:string, homeTeamNumber: any, awayTeamNumber: any, pickedTeam: any, leagueID: any ): void {

    this.apiservice.teamClick(GameID, homeTeamNumber , awayTeamNumber,  pickedTeam, leagueID);
    // this.db.collection('game'+this.dayString).add({
    // GameID: GameID });
}

}



