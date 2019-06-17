import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'carsearch'
})
export class CarSearchPipe implements PipeTransform {


    async transform(items: any[], terms: string, carsData: any): Promise<any[]> {
        let newItem: any = carsData;
        if (!items) { return []; }
        if (!terms) { return items; }
        if (!newItem) { return items; }
        // newItem = await this.carService.getCarDataOffset(this.offSetValues);
        terms = terms.toLowerCase();
        return newItem.filter(it => {
            return (it.make.toString().toLowerCase().includes(terms) || it.name.toLowerCase().includes(terms));  // only filter name and make of car
        });
    }

}
