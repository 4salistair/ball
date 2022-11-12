import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {

  
title = 'Ball';

pickedfixureSubscription: Subscription = new Subscription;
pickedFixtures: Fixture [] = [];

numberOfTheDay: number | undefined
isSaturdayAt3: boolean | undefined

 constructor(   

  private apiservice: APIService,
 
     
  ) {}

	ngOnInit() {

    const d = new Date() 
    const day = d.getDay()
    let hour = d.getHours()

    if((d.getDay() === 6 && d.getHours() >= 15) && (d.getDay() === 6 && d.getHours() < 18  ) )
      { this.isSaturdayAt3 = true }
    
    
    this.pickedfixureSubscription = this.apiservice.trackedFixturesChanged$.subscribe(
      fixture => { ( this.pickedFixtures = fixture ) 
       
      if( this.isSaturdayAt3){
        setInterval(() => {           
             this.apiservice.getLastestResult([...this.pickedFixtures]) 
        }, 60000);
       }
      })
                     
    this.apiservice.getGameIDs()

  }

  ngOnDestroy(): void {

    this.pickedfixureSubscription.unsubscribe

  }

  routeTest( ) {

    this.apiservice.clickScores(this.pickedFixtures)

  }


}


function If() {
  throw new Error('Function not implemented.');
}
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


