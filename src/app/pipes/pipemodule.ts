import { NgModule } from '@angular/core';
import { DateTimePipe } from './date-time.pipe';
import { CarSearchPipe } from './car-search.pipe';

@NgModule({
    imports: [],
    declarations: [DateTimePipe, CarSearchPipe],
    exports: [DateTimePipe, CarSearchPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
