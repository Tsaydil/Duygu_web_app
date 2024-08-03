import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReadTextFileService {

  constructor(private http: HttpClient) { }

  getTextFileContent(filePath: string): Observable<string> {
    return this.http.get(filePath, {responseType: 'text'});
  }

  readFileContents(filePath: string): Promise<string> {
    let contentText: string = '';

    return new Promise<string>((resolve, reject) => {
      this.getTextFileContent(filePath).subscribe((data) => {
        resolve(data);
      });
    });
  }

}
