import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fixture  } from '../fixture.model';
import { Subscription } from 'rxjs';
import { APIService } from '../api.service'; 


@Component({
  selector: 'app-scores-card',
  templateUrl: './scores-card.component.html',
  styleUrls: ['./scores-card.component.css']
})


export class ScoresCardComponent implements OnInit, OnDestroy {


scoreSubscription: Subscription = new Subscription;
Scores: Fixture [] = [];
  

constructor(
    private apiservice: APIService,
  
  ) {}

  ngOnInit(): void {

    this.scoreSubscription = this.apiservice.scoresChanged$.subscribe(
    fixture => {(this.Scores = fixture)})
  }

  ngOnDestroy(): void {

    this.scoreSubscription.unsubscribe 

  }
}

// import { Subscription, Subject, of } from 'rxjs';
// import { Observable } from 'rxjs'

// Scores$: Observable<Fixture[]> | undefined;

// liveScore: number | undefined 
// scoreTestClickSubscription: Subscription = new Subscription;
// scoreClickSubscription: Subscription = new Subscription;
// clickScores: Fixture [] = [];

  // this.scoreTestClickSubscription.unsubscribe
  // this.scoreClickSubscription.unsubscribe
  // this.scoreTestClickSubscription = this.apiservice.scoresTestChanged$.subscribe(
    //   liveScore => {this.liveScore =   liveScore})


    // this.scoreClickSubscription = this.apiservice.clickscoresChanged$.subscribe(
    //   Scores  => {this.clickScores  =   Scores
    //                   const getScores$: Observable<Fixture[]> = of(this.clickScores);
    //                   this.Scores$  = getScores$  
    //                // this.Scores$.forEach( (element: any) => { console.log(element) } );                
    //              })

    // const d = new Date() // returns the day as int.
    // let day = d.getDay()
    // let hour = d.getHours();


// this.scoreSubscription = this.apiservice.scoresChanged$.subscribe(
//     fixture => {(this.Scores = fixture)
//       console.log(this.Scores)
//     })
//     this.apiservice.getGameIDs()

//     this.scoreSubscription = this.apiservice.scoresChanged$.subscribe(
//     fixture => {(this.Scores = fixture)})
//     this.apiservice.testSub()
//    console.log(this.Scores)

     // this.pickedfixureSubscription = this.apiservice.trackedFixturesChanged$.subscribe(
        //   fixture => { ( this.pickedFixtures = fixture )
        //                  this.passPickedFixture(this.pickedFixtures); 
                        
          //                setInterval(() => {
          //                // this.apiservice.getGameIDs()
          //                 this.passPickedFixture(this.pickedFixtures); 
            
          //               }, 60000);
                      
                    //  })
       
          // this.apiservice.getGameIDs()

     


        // console.log('this.pickedFixtures' )
        // console.log( this.pickedFixtures )


    
    // }

    // this.pickedfixureSubscription = this.apiservice.trackedFixturesChanged$.subscribe(
    // fixture => { ( this.pickedFixtures = fixture )
    //                this.passPickedFixture(this.pickedFixtures); })
    // this.apiservice.getGameIDs()


  // }


  // passPickedFixture(pickedFixtures:Fixture[]): void {

   
  //   this.scoreSubscription = this.apiservice.scoresChanged$.subscribe(
  //     fixture => {(this.Scores = fixture)
  //                 // console.log('this.Scores') 
  //                 // console.log(this.Scores)      
  //     })
  //     this.apiservice.getLastestResult(pickedFixtures) 
      
  // }
