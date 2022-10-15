import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Fixture } from './fixture.model';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Score } from './score.model';
import { ScoresCardComponent } from './scores-card/scores-card.component';



@Injectable({
    providedIn: 'root'
  })
  
  export class APIService {
   
  apiBaseSting: any;
  

  fixureMapArray: Fixture | undefined
  Fixures: Fixture[] = [];

  champFixures: Fixture [] = [];
  fixuresChanged$ = new Subject<any []>();
  champfixuresChanged$ = new Subject<any []>();


  scoreMapArray: Score | undefined; 
  Scores: Score[] = [];
  
  dayString: string | undefined


  trackedFixtures: Fixture[] = [];
  trackedFixturesChanged$ = new Subject<any []>();

 

  scoresChanged$ = new Subject<any []>();
 // latestScore: Score | undefined; 

 

  latestScore: Score[] = [];
  
 
  constructor(  
                private http: HttpClient,
                public datepipe: DatePipe,
                private db: AngularFirestore,
                
               
    ) {}
    

    apiCall(leagueID:  string, season: string, from: string, to: string  ): void { 

        this.apiBaseSting = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?'
   

            let headers = new HttpHeaders({
    
                    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                    'x-rapidapi-key':  '75a664a5cemsh9cce042f81f79e1p18e536jsnba6b7c1aec72'
        })

           const apiFullString = this.apiBaseSting+'&'+leagueID+'&'+season+'&'+from+'&'+to
           this.http.get<any>( apiFullString, {  
     
                   headers: headers
                 
          }).subscribe(data => {    


            data.response.forEach( (element: any) => {
              this.fixureMapArray = {

                    leagueID: element.league.id,
                    fixtureID: element.fixture.id,
                    leagueName: element.league.name,
                    fixtureDescription: element.teams.home.name  +  ' V ' + element.teams.away.name,
                    homeTeamName:       element.teams.home.name,
                    homeTeamNumber:    element.teams.home.id,
                    awayTeamName:       element.teams.away.name,
                    awayTeamNumber :    element.teams.away.id,
                  };
              
              this.Fixures.push(this.fixureMapArray);
                  
            })

        
          if(this.Fixures[0]){
          
            if(this.Fixures[0].leagueID === 39 ){

            this.fixuresChanged$.next([...this.Fixures]);       

             }
            
            if (this.Fixures[0].leagueID === 40 ) {
              
              this.champFixures = this.Fixures
              this.champfixuresChanged$.next([...this.champFixures]);
              
            } 
         

          this.Fixures = [];    
          }
        }
          )    

    }


    getGameIDs(): void {

      this.dayString = 'gameDate'+'2022-10-10';
      
      // 'gameDate'+this.datepipe.transform(Date(), 'yyyy-MM-dd');

      this.db.collection(this.dayString)
      .snapshotChanges()
      .pipe(map(docData => {
      return docData.map(doc => {
      return {
        fixtureID: doc.payload.doc.id
      };
      });
      })
      )
      .subscribe((fixture: Fixture[]) => {

        this.trackedFixtures   =  fixture;
        this.trackedFixturesChanged$.next([...this.trackedFixtures ]);
        
         console.log('the numbers  in api service = ');
         console.log(this.trackedFixtures );

       });
    }

    teamClick(GameID:string,  homeTeamNumber:string , awayTeamNumber: string, pickedTeam: string): void {

    
   this.dayString = 'Date'+this.datepipe.transform(Date(), 'yyyy-MM-dd');

      this.db.collection('game'+this.dayString).add({
      GameID: GameID, 
      homeTeamNumber: homeTeamNumber,
      awayTeamNumber: awayTeamNumber,
      pickedTeam:  pickedTeam
  
    });
  }



  resultCall( ): void {  

      this.apiBaseSting = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?'
      let headers = new HttpHeaders({

               'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
               'x-rapidapi-key':  '75a664a5cemsh9cce042f81f79e1p18e536jsnba6b7c1aec72'
      })

      const apiFullString = this.apiBaseSting+'league=39&season=2022&team=65&last=1'
      this.http.get<any>( apiFullString, {  
 
                headers: headers
             
      })
       .subscribe(data => {    

  
        data.response.forEach( (element: any) => 
        
        { 

          this.scoreMapArray = { 
          homeTeamName: element.teams.home.name,
          homeTeamScore: element.goals.home,
          awayTeamName: element.teams.away.name,
          awayTeamScore: element.goals.away}
          
          console.log(data)
          this.Scores.push( this.scoreMapArray);

        })
        
          
        this.scoresChanged$.next([this.scoreMapArray])   
              
      //  this.trackedFixturesChanged$.next([...this.trackedFixtures ]);
      }) 
    }    
  }