import ApexCharts from 'apexcharts';
import dynamic from 'next/dynamic';
import ReactApexChart from 'react-apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  options: ApexCharts.ApexOptions;
  series: ChartSeries[];
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'radar';
  width?: number | string;
  height?: number | string;
}

interface ChartSeries {
  name: string;
  data: {
    x: string;
    y: number;
  }[];
}

const Chart: React.FC<Props> = ({ options, series, type, width = '100%', height = 500 }) => {
  const chartOptions = {
    ...options,
    chart: {
      ...options.chart,
      type,
      height,
    },
    xaxis: {
      ...options.xaxis,
      categories: series[0].data.map((d) => d.x),
    },
    series,
  };

  return (
    <ApexChart options={chartOptions} series={chartOptions.series} type={chartOptions.chart.type} width={width} height={height} />
  );
};

export default Chart;
