import { convertToDatetimeStr } from "@/util/Date"

export interface ChartData {
    valor: string;
    dataHoraLeitura: string;
  }
  
  interface ChartSeries {
    name: string;
    data: {
      x: string;
      y: number;
    }[];
  }
  
 export function transformDataToSeries(data: ChartData[]): ChartSeries[] {
    const series: ChartSeries[] = [{
      name: 'Valor',
      data: [],
    }];
  
    for (const item of data) {
      series[0].data.push({
        x: convertToDatetimeStr(item.dataHoraLeitura),
        y: Number(item.valor),
      });
    }
  
    return series;
  }
  