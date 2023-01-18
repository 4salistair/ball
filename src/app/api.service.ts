import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Fixture } from './fixture.model';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Score } from './score.model';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
  })
  
  export class APIService {
  
  
  apiBaseSting: any;
  
  // used to carry fixture detais from the API return onto the array pushed out by subscription 
  fixureMapArray: Fixture | undefined
  
  
  // initises arrays and subject for fixture subscripton for each league
  Fixures: Fixture[] = [];

  premFixures: Fixture [] = [];
  champFixures: Fixture [] = [];
  leaugeOneFixures: Fixture [] = [];
  leaugeTwoFixures: Fixture [] = [];

  premFixuresChanged$ = new Subject<any []>();
  champFixuresChanged$ = new Subject<any []>();
  leaugeOneFixuresChanged$ = new Subject<any []>();
  leaugeTwoFixuresChanged$ = new Subject<any []>();
  //
  
  // used to carry scores details from the API return onto the array pushed out by subscription 
  scoreMapArray: Fixture | undefined; 

 // not sure about this could be deleted
 // Scores: Score[] = [];

 // used in getGamesIDs function to build string to get GameIDs for date
  dayString: string | undefined


// used in the getGamesIDs function to asign tracked fixtures and push out via trackedFixture subject
  trackedFixtures: Fixture[] = [];
  trackedFixturesChanged$ = new Subject<any []>();


// used in getLastestResult to assign latest score to a fixture array push out via scoreChange subject
  latestScores:  Fixture[] = [];
  scoresChanged$ = new Subject<any []>();


 // latestScore: Score[] = [];
 // latestScores:  Fixture[] = [];


  // clickscoresChanged$ = new Subject<Fixture []>();
  // scoresTestChanged$ = new Subject<number>();
  

  constructor(  
                private http: HttpClient,
                public datepipe: DatePipe,
                private db: AngularFirestore,           
    ) {}
    




    // Returns fixtures for given League in a season by date range 

    apiCall(leagueID:  string, season: string, from: string, to: string  ): void { 
    
    // builds API sting 
      this.apiBaseSting = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?'
            let headers = new HttpHeaders({    
                    'x-rapidapi-host': environment.footballAPI.host,
                    'x-rapidapi-key':  environment.footballAPI.key
            })
      
     // adds params from function to base string and calls API      
      const apiFullString = this.apiBaseSting+'&'+leagueID+'&'+season+'&'+from+'&'+to
           this.http.get<any>( apiFullString, {  
     
                   headers: headers

            }).subscribe(data => {    

  
      // takes data from the API sub and map each fixure to Fixture model and pushes to Fixures array.      
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


        // works out the league and used the right subscription to push the fixtures for the league      
        if(this.Fixures[0]){

         if(this.Fixures[0].leagueNumber === 39 ){

             this.premFixures = this.Fixures
             this.premFixuresChanged$.next([...this.premFixures]);    
             this.Fixures = []
             this.premFixures = []
             

          }
            
          if (this.Fixures[0] && this.Fixures[0].leagueNumber === 40 ) {
            
                  this.champFixures = this.Fixures
                  this.champFixuresChanged$.next([...this.champFixures]);
                  this.Fixures = []
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


    // pulls the meta data for the Fixtures picked today.
    // uses trackedFixtures to push out via trackedFixturesChanged$ subscription 
        
    getGameIDs(): void {

      const dayString = 'gameDate'+ this.datepipe.transform(Date(), 'yyyy-MM-dd');

      this.db.collection(dayString)
      .snapshotChanges()
      .pipe(map(docData => {
      return docData.map(doc => {
        const  data  = doc.payload.doc.data() as  Fixture
      return {
        fixtureID:  data.fixtureID ,
        homeTeamNumber: data.homeTeamNumber,
        awayTeamNumber: data.awayTeamNumber,
        leagueNumber: data.leagueNumber,
        pickedTeam: data.pickedTeam
    

      };
      });
      })
      )
      .subscribe((fixture: Fixture[]) => {

        //  console.log('this.trackedFixtures from gameIDs call' )
        //  console.log(this.trackedFixtures )
         this.trackedFixtures   =  fixture;
         this.trackedFixturesChanged$.next([...this.trackedFixtures ]);
        

       });
    }

    
    // takes a Fixture array, call 
    getLastestResult( fixture: Fixture[]) {
       
      // is this required???
      this.latestScores = [];
      
      this.apiBaseSting = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?'
      let headers = new HttpHeaders({

        'x-rapidapi-host': environment.footballAPI.host,
        'x-rapidapi-key':  environment.footballAPI.key
              
       })
      
       // for each fixture in array calls API
       // maps fixture and pushes onto latest score array 
       fixture.forEach( (element: any) => 
        { 
          const apiFullString = this.apiBaseSting +
    
                          'id=' + element.fixtureID
                          
          this.http.get<any>( apiFullString, {  
 
          headers: headers

        })
        .subscribe(data => {    
      
        data.response.forEach( (element: any) => 

          { 
          this.scoreMapArray = 
            { 
              fixtureID: element.fixture.id ,
              homeTeamName: element.teams.home.name,
              homeTeamScore:  element.goals.home,
              awayTeamName: element.teams.away.name,
              awayTeamScore: element.goals.away,
              pickedTeam: element.pickedTeam
            }
          
          this.latestScores.push(this.scoreMapArray);
          // console.log('this.scoreMapArray')
          // console.log(this.scoreMapArray)


          })
        }) 

        })
       console.log('this.latestScores')
       console.log(this.latestScores)

     
      

      //this.latestScores = fixture;

       this.scoresChanged$.next(this.latestScores);
      
     
     
      //  console.log(this.latestScores)
     //  this.clickscoresChanged$.next([...this.latestScores])
    

    }

  
    // pushes a selected fixture onto data collection, for todays date.
    teamClick(GameID:string,  homeTeamNumber:string , awayTeamNumber: string, pickedTeam: string, leagueNumber: string): void {
     
     this.dayString = 'Date'+this.datepipe.transform(Date(), 'yyyy-MM-dd');

        this.db.collection('game'+this.dayString).add({
         fixtureID: GameID, 
         homeTeamNumber: homeTeamNumber,
         awayTeamNumber: awayTeamNumber,
         pickedTeam:  pickedTeam,
         leagueNumber: leagueNumber
        });
    }



  // clickScores(clicksScores: Fixture[]) {
  //   this.getLastestResult([...clicksScores]) 
  // }

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