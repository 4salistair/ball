import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Fixture } from './fixture.model';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Score } from './score.model';



@Injectable({
    providedIn: 'root'
  })
  
  export class APIService {
   
  apiBaseSting: any;
  
  fixureMapArray: Fixture | undefined
  
  
  Fixures: Fixture[] = [];
  champFixures: Fixture [] = [];
  leaugeOneFixures: Fixture [] = [];
  leaugeTwoFixures: Fixture [] = [];


  fixuresChanged$ = new Subject<any []>();
  champFixuresChanged$ = new Subject<any []>();
  leaugeOneFixuresChanged$ = new Subject<any []>();
  leaugeTwoFixuresChanged$ = new Subject<any []>();

  scoreMapArray!: Fixture; 
  Scores: Score[] = [];

  dayString: string | undefined

  trackedFixtures: Fixture[] = [];
  trackedFixturesChanged$ = new Subject<any []>();
  
  scoresChanged$ = new Subject<any []>();

  latestScore: Score[] = [];
  latestScores:  Fixture[] = [];

  clickscoresChanged$ = new Subject<Fixture []>();
  scoresTestChanged$ = new Subject<number>();
  

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

                    leagueNumber: element.league.id,
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

         if(this.Fixures[0].leagueNumber === 39 ){

             this.fixuresChanged$.next([...this.Fixures]);    
             this.Fixures = []
          
          }
            
          if (this.Fixures[0] && this.Fixures[0].leagueNumber === 40 ) {
            
                  this.champFixures = this.Fixures
                  this.Fixures = []
                
                  this.champFixuresChanged$.next([...this.champFixures]);
                  this.champFixures = []
          } 

          if (this.Fixures[0] && this.Fixures[0].leagueNumber === 41 ) {
            
                  this.leaugeOneFixures = this.Fixures
                  this.leaugeOneFixuresChanged$.next([...this.leaugeOneFixures]);
                  this.Fixures = []
                  this.leaugeOneFixures = []
          } 

          if (this.Fixures[0] && this.Fixures[0].leagueNumber === 42 ) {
            
                  this.leaugeTwoFixures = this.Fixures
                  this.leaugeTwoFixuresChanged$.next([...this.leaugeTwoFixures ]);
                  this.Fixures = []
                  this.leaugeTwoFixures = []
          } 

    
        
        
         }
      })    

    }


    getGameIDs(): void {

      const dayString = 'gameDate'+ this.datepipe.transform(Date(), 'yyyy-MM-dd');

      this.db.collection(dayString)
      .snapshotChanges()
      .pipe(map(docData => {
      return docData.map(doc => {
        const  data  = doc.payload.doc.data() as  Fixture
      return {
        fixtureID: doc.payload.doc.id,
        homeTeamNumber: data.homeTeamNumber,
        awayTeamNumber: data.awayTeamNumber,
        leagueNumber: data.leagueNumber,
        pickedTeam: data.pickedTeam
    

      };
      });
      })
      )
      .subscribe((fixture: Fixture[]) => {

      
         this.trackedFixtures   =  fixture;
         this.trackedFixturesChanged$.next([...this.trackedFixtures ]);
        

       });
    }


    getLastestResult( fixture: Fixture[]) {
  
      this.apiBaseSting = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?'
      let headers = new HttpHeaders({

                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
                'x-rapidapi-key':  '75a664a5cemsh9cce042f81f79e1p18e536jsnba6b7c1aec72'
       })
       
       fixture.forEach( (element: any) => 
        { 
          const apiFullString = this.apiBaseSting +
                          'league=' + element.leagueNumber +
                          '&' +
                          'season=2022' +
                          '&' +
                          'team=' + element.pickedTeam +
                          '&last=1'
 

          this.http.get<any>( apiFullString, {  
 
          headers: headers

        })
        .subscribe(data => {    

        data.response.forEach( (element: any) => 

          { 
          this.scoreMapArray = 
            { 
              fixtureID: element.fixtureID,
              homeTeamName: element.teams.home.name,
              homeTeamScore: element.goals.home,
              awayTeamName: element.teams.away.name,
              awayTeamScore: element.goals.away,
              pickedTeam: element.pickedTeam
            }

          this.latestScores.push( this.scoreMapArray);
      
          })
        }) 

        })

       this.scoresChanged$.next(this.latestScores);
       this.clickscoresChanged$.next([...this.latestScores])
       this.latestScores = []

    }

  
  
    teamClick(GameID:string,  homeTeamNumber:string , awayTeamNumber: string, pickedTeam: string, leagueNumber: string): void {

    
     this.dayString = 'Date'+this.datepipe.transform(Date(), 'yyyy-MM-dd');

        this.db.collection('game'+this.dayString).add({
         GameID: GameID, 
         homeTeamNumber: homeTeamNumber,
         awayTeamNumber: awayTeamNumber,
         pickedTeam:  pickedTeam,
         leagueNumber: leagueNumber
  
        });
    }



  clickScores(clicksScores: Fixture[]) {
    this.getLastestResult([...clicksScores]) 
  }

}


// scoreSubscription: Subscription = new Subscription;
// Scores: Fixture [] = [];


  // clickSub(scoreCount: number) {

  //   this.scoresTestChanged$.next(scoreCount)
  // }

 // this.clickscoresChanged$.next([...clicksScores])

  // resultCall( ): void {  

  //     this.apiBaseSting = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?'
  //     let headers = new HttpHeaders({

  //              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
  //              'x-rapidapi-key':  '75a664a5cemsh9cce042f81f79e1p18e536jsnba6b7c1aec72'
  //     })

  //     const apiFullString = this.apiBaseSting+'league=39&season=2022&team=65&last=1'
  //     this.http.get<any>( apiFullString, {  
 
  //               headers: headers
             
  //     })
  //      .subscribe(data => {    

  
  //       data.response.forEach( (element: any) => 
        
  //       { 

  //       //   this.scoreMapArray = { 
  //       //   homeTeamName: element.teams.home.name,
  //       //   homeTeamScore: element.goals.home,
  //       //   awayTeamName: element.teams.away.name,
  //       //   awayTeamScore: element.goals.away}
          
  //       //  // console.log(data)
  //       //   this.Scores.push( this.scoreMapArray);

  //       })
        
          
  //       // this.scoresChanged$.next([this.scoreMapArray])   
              
  //     }) 
  //   }    