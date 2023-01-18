import { Pipe, PipeTransform } from '@angular/core'
import { Fixture } from './fixture.model';


@Pipe({
  name: 'FixturePipe',
  pure: true
})
export class FixturePipe implements PipeTransform {

nValue: Fixture[] | undefined

    transform(value: Fixture[], picks: Fixture[]): any {

      if (picks.length === 0) {
         return value;
      }
        
   for (const ItemFromValue of value) {
      for (const ItemFiltered of picks) {
           if (ItemFiltered.fixtureID === ItemFromValue.fixtureID) {
             value.splice(value.map((el) => el.fixtureID).indexOf(ItemFromValue.fixtureID), 1);
        }
     }
}

        return value; 
    }

}