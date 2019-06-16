import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ApplicationHelper {

    constructor() { }

    static async getSplitArray(arrayToSplit) {
        const groupSize = 2;
        const finalInput = await _.map(arrayToSplit, (item, index) => {
            return index % groupSize === 0 ?
                arrayToSplit.slice(index, index + groupSize) :
                null;
        }).filter((item) => {
            return item;
        });
        return finalInput;

    }

}

@Injectable()
export class ApiResources {
    static apiBaseURL: string = ApiResources.getURL();

    static getAllCarsDetails = ApiResources.apiBaseURL + '/api/data/cars';

    static getCarAvailabilityUrl = ApiResources.apiBaseURL + '/api/data/availability?id={0}';




    static getURL(): any {
        const qa = false;
        const prod = false;
        const dev = true;

        if (qa) {
            return ' https://shivarthauto-api.azurewebsites.net';
        } else if (prod) {
            return ' https://shivarthauto-api.azurewebsites.net';
        } else {
            return ' https://shivarthauto-api.azurewebsites.net';
        }
    }

}

