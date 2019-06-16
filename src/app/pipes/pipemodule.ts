import { NgModule } from '@angular/core';
import { DateTimePipe } from './date-time.pipe';

@NgModule({
    imports: [],
    declarations: [DateTimePipe],
    exports: [DateTimePipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
