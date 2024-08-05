import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { ApiSensorService } from '../../services/api-sensor.service';
import { interfaceSensores } from '../../graficas/interfaces/data.interfaces';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrl: './real-time.component.css'
})
export class RealTimeComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(private _realTimeService: ApiSensorService  ) {}
  ngOnInit(): void {
    this.initializeChart();
    this.fetchData();
  }
  initializeChart(): void {
    this.chartOptions = {
      series: [{
        name: "Sensor Data",
        data: []
      }],
      chart: {
        type: 'line',
        height: 350,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        }
      },
      xaxis: {
        type: 'datetime'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: '#f1f1f1',
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Datos de sensores en tiempo real',
        align: 'left'
      }
    };
  }

  fetchData(): void {
    interval(5000).pipe(
      switchMap(() => this._realTimeService.getRealTimeData())
    ).subscribe(data => {
      this.updateChartData(data);
    });
  }

  updateChartData(data: interfaceSensores[]): void {
    const chartData = data.map(item => ({
      x: new Date(item.timestamp),
      y: item.humidity
    }));
    this.chartOptions.series = [{
      name: "Sensor Data",
      data: chartData
    }];
  }
}

