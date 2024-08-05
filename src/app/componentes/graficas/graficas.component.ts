import { Component, EventEmitter, OnInit, ViewChild , Output} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexYAxis,
  ApexTooltip
} from "ng-apexcharts"; // Importaciones necesarias de ApexCharts y Angular Core
import { ApiSensorService } from '../../services/api-sensor.service'; // Importación del servicio que obtiene los datos del sensor
import { interfaceSensores } from '../../graficas/interfaces/data.interfaces';


export type ChartOptions = {
  series: ApexAxisChartSeries; // Serie de datos para el gráfico
  chart: ApexChart; // Configuraciones del gráfico
  xaxis: ApexXAxis; // Configuraciones del eje X
  title: ApexTitleSubtitle; // Título y subtitulo del gráfico
  dataLabels: ApexDataLabels; // Etiquetas de datos en el gráfico
  yaxis: ApexYAxis; // Configuraciones del eje Y
  tooltip: ApexTooltip; // Configuraciones de tooltip
};

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html', // Plantilla HTML del componente
  styleUrls: ['./graficas.component.css'], // Estilos CSS del componente
})
export class GraficasComponent implements OnInit {
  averageTemperature: number = 0;
  averageHumidity: number = 0;
  @ViewChild('chart') chart!: ChartComponent; // Referencia al componente de gráfico dentro del HTML
  public chartOptions: Partial<ChartOptions>; // Opciones del gráfico, inicialmente parciales

  public dataSensor: interfaceSensores[] = []; // Arreglo para almacenar los datos del sensor

  constructor(private _serviceSensor: ApiSensorService) {
    // Configuración inicial del gráfico utilizando ApexCharts
    this.chartOptions = {
      series: [], // Inicialización vacía de las series de datos
      chart: {
        height: 350, // Altura del gráfico en píxeles
        type: 'line', // Tipo de gráfico (línea en este caso)
        zoom: {
          enabled: false, // Deshabilita el zoom en el gráfico
        },
      },
      title: {
        text: 'Datos de Sensores Humedad y Temperatura', // Título del gráfico
      },
      xaxis: {
        type: 'datetime', // Tipo de eje X para manejar fechas y horas
        labels: {
          format: 'dd MMM HH:mm', // Formato de la fecha en el eje X
        },
      },
      dataLabels: {
        enabled: true, // Habilita las etiquetas de datos
        formatter: function (
          value: any,
          { seriesIndex, dataPointIndex, w }: any
        ) {
          return w.config.series[seriesIndex].data[dataPointIndex]
            .formattedDate; // Formateador para las etiquetas de datos
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value.toFixed(2); // Formateador para los valores del eje Y, redondea a 2 decimales
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM HH:mm', // Formato de la fecha en el tooltip
        },
      },
    };
  }

  ngOnInit(): void {
    const endDate = new Date(); // Fecha actual del sistema
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 1); // Restar 24 horas a  la fecha actual

    // Llamada al servicio para obtener los datos del sensor con filtro opcional por fechas
    this._serviceSensor.getData(startDate, endDate).subscribe(
      (resp) => {
        console.log(startDate);
        console.log(endDate);

        console.log('Datos obtenidos:', resp); // Log de los datos obtenidos del servicio
        this.dataSensor = resp;

        const mediaTemperatura= this.mediaTeperatura(this.dataSensor);// Obtener el tamaño del arreglo
        const mediaHumedad = this.mediaHumedad(this.dataSensor);
        console.log(mediaTemperatura);
        console.log(mediaHumedad)

        const aggregatedData = this.aggregateDataByInterval(resp, 30);

        // Preparar los datos para la gráfica
        const seriesTemp = aggregatedData.map((data) => ({
          x: new Date(data.timestamp).getTime(),
          y: parseInt(data.temperature), // Redondear a 2 decimales
        }));

        const seriesHumidity = aggregatedData.map((data) => ({
          x: new Date(data.timestamp).getTime(),
          y: parseInt(data.humidity),
        }));

        // Actualizar las opciones del gráfico con los datos preparados
        this.chartOptions = {
          series: [
            {
              name: 'Temperatura',
              data: seriesTemp,
            },
            {
              name: 'Humedad',
              data: seriesHumidity,
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          title: {
            text: 'Datos de Sensores',
          },
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'dd MMM HH:mm', // Formato de la fecha en el eje X
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (
              value: any,
              { seriesIndex, dataPointIndex, w }: any
            ) {
              return w.config.series[seriesIndex].data[dataPointIndex]
                .formattedDate;
            },
          },
          yaxis: {
            title: {
              text: 'Grados Celsius', // Etiqueta para el eje Y
            },
            labels: {
              formatter: function (value: any) {
                return value.toFixed(2);
              },
            },
          },
          tooltip: {
            x: {
              format: 'dd MMM HH:mm', // Formato de la fecha en el tooltip
            },
          },
        };
      },
      (error) => {
        console.error('Error al obtener los datos:', error); // Manejo de errores si la llamada al servicio falla
      }
    );
  }

  // ====================Función para agrupar los datos por intervalos de tiempo especificados================
  aggregateDataByInterval(
    data: interfaceSensores[],
    intervalMinutes: number
  ): any[] {
    const aggregatedData: any[] = [];
    const tempData: {
      [key: string]: { temperature: number[]; humidity: number[] };
    } = {};

    data.forEach((sensor) => {
      const timestamp = new Date(sensor.timestamp);
      timestamp.setMinutes(
        Math.floor(timestamp.getMinutes() / intervalMinutes) * intervalMinutes
      );
      timestamp.setSeconds(0);
      timestamp.setMilliseconds(0);

      const key = timestamp.toISOString();

      if (!tempData[key]) {
        tempData[key] = { temperature: [], humidity: [] };
      }
      tempData[key].temperature.push(sensor.temperature);
      tempData[key].humidity.push(sensor.humidity);
    });

    for (const [key, value] of Object.entries(tempData)) {
      const timestamp = new Date(key);
      const avgTemp =
        value.temperature.reduce((a, b) => a + b) / value.temperature.length;
      const avgHumidity =
        value.humidity.reduce((a, b) => a + b) / value.humidity.length;

      aggregatedData.push({
        timestamp,
        temperature: avgTemp,
        humidity: avgHumidity,
      });
    }

    return aggregatedData;
  }
  //Busca datos capturados desde el cliente
  searchDate(event: { startDate: Date | null; endDate: Date | null }): void {
    console.log('Evento capturado desde media graficas');
    console.log(event.startDate);
    console.log(event.endDate);

    if (event.startDate && event.endDate) {
      const startDate = new Date(event.startDate.toString());
      const endDate = new Date(event.endDate.toString());

      console.log('Fechas convertidas:');
      console.log(startDate);
      console.log(endDate);

      // Llamada al servicio para obtener los datos filtrados por las fechas convertidas
      this._serviceSensor.getData(startDate, endDate).subscribe(
        (resp) => {
          console.log('Datos obtenidos:', resp);
          this.dataSensor = resp;          // resp.forEach(( data, index)=>{
          //   console.log("${index}", data);
          // })

          // Agrupar los datos por intervalos de 30 minutos
          const mediaTemperatura= this.mediaTeperatura(this.dataSensor);
          const mediaHumedad = this.mediaHumedad(this.dataSensor);
          console.log(mediaTemperatura);
          console.log(mediaHumedad);

          const aggregatedData = this.aggregateDataByInterval(resp, 30);

          // Preparar los datos para la gráfica
          const seriesTemp = aggregatedData.map((data) => ({
            x: new Date(data.timestamp).getTime(),
            y: parseInt(data.temperature ), // Redondear a 2 decimales
          }));

          const seriesHumidity = aggregatedData.map((data) => ({
            x: new Date(data.timestamp).getTime(),
            y: parseInt(data.humidity), // Redondear a 2 decimales
          }));

          // Actualizar las opciones del gráfico con los datos preparados
          this.chartOptions = {
            ...this.chartOptions,
            series: [
              {
                name: 'Temperatura',
                data: seriesTemp,
              },
              {
                name: 'Humedad',
                data: seriesHumidity,
              },
            ],
          };
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }

  // Añade una función para convertir las fechas capturadas a formato ISO8601
  convertToISODateString(dateString: string): string {
    return new Date(dateString).toISOString();
  }

  //==============Funcion para obtener la media temrpatura==============================

  mediaTeperatura(arrayData: interfaceSensores[]):number {
    const tamanioData = arrayData.length;
    // suma la temperatura
    const sumTemperature = arrayData.reduce(
      (sum, data) => sum + data.temperature,
      0
    );
    // Calcular la media de la temperatura
    const averageTemperature = sumTemperature / tamanioData;

    // emite hacia el componente Media Grficas
    this.averageTemperature= Math.round(averageTemperature);

    return this.averageTemperature;
  }

 //================== Meotodo para calular la humedad ======================================
  mediaHumedad(arrayData: interfaceSensores[]): number {
    const tamanioData = arrayData.length;

    if (tamanioData === 0) {
      console.log('El arreglo de datos está vacío.');
      return 0;
    }
    // Suma la humedad
    const sumHumidity = arrayData.reduce((sum, data) => sum + data.humidity, 0);
    // Calcular la media de la humedad
    const averageHumidity = sumHumidity / tamanioData;

    // Actualizar la media de la humedad
    this.averageHumidity = Math.round(averageHumidity);

    return this.averageHumidity;
  }
}
