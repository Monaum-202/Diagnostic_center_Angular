import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "http://localhost:9090/api/users";

  addData(userData: any) {
    return this.httpClient.post(this.apiUrl, userData)
  }

  getAllData() {
    return this.httpClient.get(this.apiUrl)
  }

  getByuserName(userName: any) {
    return this.httpClient.get(this.apiUrl + "/" + userName)
  }

  deleteById(userName: any) {
    return this.httpClient.delete(this.apiUrl + "/" + userName)
  }

  updateData(userData: any) {
    return this.httpClient.put(this.apiUrl + "/" + userData.userName, userData)
  }
}
