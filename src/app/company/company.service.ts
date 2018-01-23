import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyService {

  constructor(public http: HttpClient) { }

  /**
   * Method to create a company
   * @param data
   */
  public add(data) {
    // Send the request to add a new user
    return this.http.post('/company/add', data).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do remove a company
   * @param id
   */
  public remove(id) {
    // Send the request to remove an user
    return this.http.put('/company/remove', { body: { id: id } }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to fetch all companies
   */
  public fetch() {
    // Send the request to get the user list
    return this.http.get('/company/list').toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to edit a company
   * @param data
   */
  public edit(data) {
    // Send the request to edit user
    return this.http.put('/company/edit', data).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to retrieve just one company data from server
   * @param id
   */
  public get(id) {
    // Send the request to edit user
    return this.http.get('/company/' + id).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to change the status of a company
   * @param id
   * @param status
   */
  public changeStatus(id, status) {
    // Send the request to edit user
    return this.http.post('/company/change-status', { body: { id: id, status: status } }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

}
