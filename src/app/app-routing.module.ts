import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoresCardComponent } from './scores-card/scores-card.component'; 
import { FixtureCardComponent} from './fixture-card/fixture-card.component'; 


const routes: Routes = [
  { path: '', component: ScoresCardComponent },
  { path: 'scores', component: ScoresCardComponent},
  { path: 'fixtures', component: FixtureCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
