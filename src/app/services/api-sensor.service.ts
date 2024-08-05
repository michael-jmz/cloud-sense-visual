import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import config from '../../../config.json';
import { interfaceSensores } from '../graficas/interfaces/data.interfaces';

// Ajusta la ruta según la ubicación real de config.json

const API_KEY:string = config.apiKey;
const API_URL = 'https://connectangular.azurewebsites.net/api/func_getCosmosData';

@Injectable({
  providedIn: 'root'
})
export class ApiSensorService {

  constructor(private http: HttpClient) { }

  // getData(startDate: Date, endDate: Date): Observable<interfaceSensores[]> {
  //    // Convertir las fechas al formato ISO y ajustar la zona horaria a UTC
  //   const params = new HttpParams()
  //     .set('code', API_KEY)
  //     .set('startDate', startDate.toISOString())
  //     .set('endDate', endDate.toISOString());

  //   return this.http.get<interfaceSensores[]>(API_URL, { params }).pipe(
  //     map(data => this.filterDataByDate(data, startDate, endDate)),
  //     catchError(error => {
  //       console.error('Error al obtener datos:', error);
  //       throw error;
  //     })
  //   );
  // }

  // private filterDataByDate(data: interfaceSensores[], startDate: Date, endDate: Date): interfaceSensores[] {
  //   return data.filter(sensor => {
  //     const sensorDate = new Date(sensor.timestamp);
  //     return sensorDate >= startDate && sensorDate <= endDate;
  //   });
  // }


  getData(startDate: Date, endDate: Date): Observable<interfaceSensores[]> {
    const params = new HttpParams()
      .set('code', API_KEY)
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http.get<interfaceSensores[]>(API_URL, { params }).pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        throw error;
      })
    );
  }

  getRealTimeData(): Observable<interfaceSensores[]> {
    const params = new HttpParams()
      .set('code', API_KEY)
      .set('realTime', 'true');

    return this.http.get<interfaceSensores[]>(API_URL, { params }).pipe(
      catchError(error => {
        console.error('Error al obtener datos en tiempo real:', error);
        throw error;
      })
    );
  }
}

