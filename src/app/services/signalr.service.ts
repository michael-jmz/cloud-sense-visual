import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://signaltiemporeal.service.signalr.net/api', {
        accessTokenFactory: () => 'W1Qw5B30lrTbqGkjYBY4aqjEssI1dKnklRfjjwfisGg='
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener(): void {
    this.hubConnection.on('newSensorData', (data) => {
      console.log('New data received from SignalR', data);
      // Handle the received data
    });
  }
}
