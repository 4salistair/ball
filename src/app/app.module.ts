import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService } from './api.service';
import { FixtureCardComponent } from './fixture-card/fixture-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.model';
import { FormsModule } from '@angular/forms';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { collection } from '@firebase/firestore';
import { DatePipe } from '@angular/common';
import { ScoresCardComponent } from './scores-card/scores-card.component';
import { FixturePipe } from './fixture-pipe';
import { NavigateComponent } from './navigate/navigate.component'

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule, provideFirestore,getFirestore } from '@angular/fire/firestore';
// import { AngularFireAuthModule, provideAuth,getAuth } from '@angular/fire/auth';
// import { provideMessaging,getMessaging } from '@angular/fire/messaging';



@NgModule({
  declarations: [
    AppComponent,
    FixtureCardComponent,
    ScoresCardComponent,
    FixturePipe,
    NavigateComponent
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
   
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideMessaging(() => getMessaging())

    

  ],
  providers: [APIService,  MaterialModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


function provideFirestore(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

