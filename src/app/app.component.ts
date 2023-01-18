import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { APIService } from './api.service'; 
import { Fixture  } from './fixture.model';

//**********************************//
// sudo kill $(sudo lsof -t -i:4200)//
//**********************************//


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  
title = 'Ball';


// subscription returns fixture meta data from the datastore
pickedfixureSubscription: Subscription = new Subscription;
pickedFixtures: Fixture [] = [];

// subscription used for logic to detemine if 3pm on Saturday 
  //**  numberOfTheDay: number | undefined
  //**  isSaturdayAt3: boolean | undefined


 constructor(   

  private apiservice: APIService,
 
     
  ) {}

	ngOnInit() {


  // subscribes to tracked fixture
    this.pickedfixureSubscription = this.apiservice.trackedFixturesChanged$.subscribe(
      fixture => { ( this.pickedFixtures = fixture ) 
      })


  // calls the finction that pull the tracked fixtures
    this.apiservice.getGameIDs()

      
  // executes every 60 secs 
  // setInterval(() => {   
          
            //  console.log('this.pickedFixtures every 6 seconds')  
            //  console.log(this.pickedFixtures )   

    // passes fixuture meta data to the results function 
             this.apiservice.getLastestResult([...this.pickedFixtures]) 
  //  }, 60000);
    //  }
   
                     
   
  }


  ngOnDestroy(): void {

    this.pickedfixureSubscription.unsubscribe

  }



  routeTest( ) {

  //  this.apiservice.clickScores(this.pickedFixtures)

  }


}


function If() {
  throw new Error('Function not implemented.');
}


  // Logic used to determine if 3PM saturday needs replacing with date picker.
    //** const d = new Date() 
    //** const day = d.getDay()
    //** let hour = d.getHours()

    //** if((d.getDay() === 6 && d.getHours() >= 15) && (d.getDay() === 6 && d.getHours() < 18  ) )
    //**  { this.isSaturdayAt3 = true }
    
      

  // subscription returns fixture meta data from the datastore


// scoreSubscription: Subscription = new Subscription;
// Scores: Fixture [] = [];

// scoreCount= 0
//    this.apiservice.clickSub(this.scoreCount)

    // this.scoreCount++;
    // this.passPickedFixture(this.pickedFixtures) 
    // console.log('this.pickedFixtures')
    // console.log(this.pickedFixtures)
  

    // this.router.routeReuseStrategy.shouldReuseRoute = () => false
    // this.router.onSameUrlNavigation = 'reload'
    // this.router.navigate( ['./scores'])
   // console.log( this.scoreCount)


  //  passPickedFixture(pickedFixtures:Fixture[]): void {

   
  //   this.scoreSubscription = this.apiservice.scoresChanged$.subscribe(
  //     fixture => {(this.Scores = fixture)
  //                 // console.log('this.Scores') 
  //                 // console.log(this.Scores)      
  //     })
  //     this.apiservice.getLastestResult(pickedFixtures) 
      
  // }


