import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoresCardComponent } from './scores-card/scores-card.component'; 

const routes: Routes = [
  { path: 'scores', component: ScoresCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
