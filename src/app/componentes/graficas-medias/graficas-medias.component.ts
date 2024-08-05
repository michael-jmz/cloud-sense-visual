import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';


import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";
import Swal from 'sweetalert2';
import { ApiSensorService } from '../../services/api-sensor.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-graficas-medias',
  templateUrl: './graficas-medias.component.html',
  styleUrls: ['./graficas-medias.component.css']
})
export class GraficasMediasComponent implements OnInit, OnChanges {
  @ViewChild("chart") chart!: ChartComponent;
  //public chartOptions: Partial<ChartOptions>;


  startDate: Date | null = null;
  endDate: Date | null = null;

//Aqwui revcivo la medias tanto de humedad como temperatura desde el componente de Graficas
  @Input() averageTemperature: number = 0;
  @Input() averageHumidity: number = 0;

  @Output()
  public searchDate: EventEmitter<{ startDate: Date | null, endDate: Date | null }>= new EventEmitter();

  // @Output() dateChange = new EventEmitter<{ startDate: Date | null, endDate: Date | null }>();
 //Capturo la temperatura desde Graficas
 ngOnChanges(changes: SimpleChanges): void {
  if (changes['averageTemperature']) {
    this.updateTemperatureChart();
  }
  if (changes['averageHumidity']) {
    this.updateHumidityChart();
  }

}

public chartOptionsTemperature: Partial<ChartOptions>;
public chartOptionsHumidity: Partial<ChartOptions>;

  constructor( private _serviceSensor: ApiSensorService) {
    this.chartOptionsTemperature = {
      series: [this.averageTemperature],
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function(val) {
                return val + "°C";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          gradientToColors: ["#FF0000", "#FFA500"], // Rojo y Naranja para la temperatura
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["Media de temperatura"]
    };

 //============GRAFICA DE MEDIA DE HUMEDAD==================
    this.chartOptionsHumidity = {
      series: [this.averageHumidity],
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function(val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          gradientToColors: ["#0000FF", "#00FFFF"], // Azul y Cyan para la humedad
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["Media de humedad"]
    };
  }
  ngOnInit(): void {

    throw new Error('Method not implemented.');

  }


  generateChart() {
    // Lógica para generar el gráfico con las fechas seleccionadas
    if (this.startDate && this.endDate) {
      // Asegurarse de que la fecha de inicio sea anterior a la fecha de fin
      if (this.startDate > this.endDate) {
        console.error('La fecha de inicio no puede ser posterior a la fecha de fin.');
        Swal.fire({
          title: 'Rango de fechas invalido',
          icon: 'error',
          text: 'La fecha de inicio debe ser menor a la fecha de fin.',
        });
        return;
      }
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        text: 'Buscando...',
      });
      Swal.showLoading();
      setTimeout(() => {
        Swal.close();
      }, 1000); // Espera 1.5 segundos antes de cerrar
      console.log(this.startDate);
      this.searchDate.emit({ startDate: this.startDate, endDate: this.endDate });
      // this.dateChange.emit({ startDate: this.startDate, endDate: this.endDate });
      // Aquí puedes agregar la lógica para generar el gráfico utilizando las fechas seleccionadas
      // Por ejemplo, podrías llamar a un servicio para obtener los datos y luego visualizarlos
      // Llamada al servicio para obtener los datos filtrados por las fechas convertidas
      this._serviceSensor.getData(this.startDate, this.endDate).subscribe(
        resp => {
          console.log('Datos obtenidos desde media grafica:', resp);
        },
        error => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      Swal.fire({
        title: 'Error de búsqueda',
        icon: 'error',
        text: 'No seleccion ninguna fecha para buscar',
      });
      console.error('Ambas fechas deben ser seleccionadas.');
    }
  }
  updateTemperatureChart(): void {
    this.chartOptionsTemperature.series = [this.averageTemperature];
  }

  updateHumidityChart(): void {
    this.chartOptionsHumidity.series = [this.averageHumidity];
  }

}
