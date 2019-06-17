import { Injectable } from '@angular/core';
import { Api } from '../api.service';
import { ApiResponse } from 'src/app/models/api-response';
import { RequestStatus } from 'src/app/models/enum.enum';
import { HttpErrorResponse } from '@angular/common/http';
import * as textFilter from 'string-format';
import { ApiResources } from '../application-helper.service';
@Injectable({
  providedIn: 'root'
})
export class CarServerService {

  constructor(
    public apiServices: Api
  ) { }

  async getCarAvailable(carId: any): Promise<ApiResponse> {
    console.log(ApiResources.getAllCarsDetails);
    let returnAllCarResponse = new ApiResponse();
    const url = textFilter(ApiResources.getCarAvailabilityUrl, carId);
    try {
      returnAllCarResponse.data = await this.apiServices.get(url).toPromise();
      returnAllCarResponse.status = RequestStatus.Success;
      return returnAllCarResponse;
    } catch (error) {
      console.log('error', error);
      error = new HttpErrorResponse(error);
      returnAllCarResponse = {
        status: RequestStatus.Fail,
        data: null,
        message: error.message ? error.message : null,
        statusCode: error.status,
        statusText: error.statusText,
        errorMessage: error.error ? error.error.message ? error.error.message : error.error : null,
      };
      console.log('Server get car available details service catch error', returnAllCarResponse);
      return returnAllCarResponse;
    }
  }

  async getAllCarData(): Promise<ApiResponse> {
    console.log(ApiResources.getAllCarsDetails)
    let returnAllCarResponse = new ApiResponse();
    try {
      returnAllCarResponse.data = await this.apiServices.get(ApiResources.getAllCarsDetails).toPromise();
      returnAllCarResponse.status = RequestStatus.Success;
      return returnAllCarResponse;
    } catch (error) {
      console.log('error', error);
      error = new HttpErrorResponse(error);
      returnAllCarResponse = {
        status: RequestStatus.Fail,
        data: null,
        message: error.message ? error.message : null,
        statusCode: error.status,
        statusText: error.statusText,
        errorMessage: error.error ? error.error.message ? error.error.message : error.error : null,
      };
      console.log('Server get all car details service catch error', returnAllCarResponse);
      return returnAllCarResponse;
    }
  }

  // async doSignUp(accountInfo: any): Promise<ApiResponse> {
  //   let returnSignupResponse = new ApiResponse();
  //   const regData = new RegistrationModel(accountInfo, ApplicationSettings.deviceData);
  //   try {
  //     returnSignupResponse.data = await this.apiServices.post(ApiResources.postDeviceInfo, regData).toPromise();
  //     returnSignupResponse.status = RequestStatus.Success;
  //     return returnSignupResponse;
  //   } catch (error) {
  //     error = new HttpErrorResponse(error);
  //     returnSignupResponse = {
  //       status: RequestStatus.Fail,
  //       data: null,
  //       message: error.message ? error.message : null,
  //       statusCode: error.status,
  //       statusText: error.statusText,
  //       errorMessage: error.error ? error.error.message ? error.error.message : error.error : null,
  //     };
  //     console.log('Signup service catch error', returnSignupResponse);
  //     return returnSignupResponse;
  //   }
  // }
}
