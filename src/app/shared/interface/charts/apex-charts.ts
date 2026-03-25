import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexTheme,
  ApexMarkers,
  ApexGrid,
  ApexResponsive,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';

export interface BasicChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  colors: string[];
  xaxis: ApexXAxis;
  legend?: ApexLegend;
}

export interface AreaChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  colors: string[];
  title?: ApexTitleSubtitle;
}

export interface ApexPlotOptionsBarDumbbell extends ApexPlotOptions {
  bar: ApexPlotOptions['bar'] & {
    isDumbbell?: boolean;
    dumbbellColors?: [string, string][]; // array of pairs of colors
  };
}

export interface DumbbellChartOptions {
  series: {
    data: {
      x: string;
      y: [number, number];
    }[];
  }[];
  chart: ApexChart;
  plotOptions: ApexPlotOptionsBarDumbbell;
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  colors?: string[];
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  title?: ApexTitleSubtitle;
}

export interface ColumnChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend?: ApexLegend;
}

export interface MixedChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  colors: string[];
  fill: ApexFill;
  labels: string[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  legend?: ApexLegend;
}

export interface PyramidChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  legend: ApexLegend;
}

export interface BubbleChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  legend: ApexLegend;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  theme: ApexTheme;
  colors: string[];
}

export interface PolarChartOptionsType {
  series: number[];
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
}

export interface CandleChartOptionsType {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
}

export interface PieChartOptions {
  series: ApexNonAxisChartSeries; // because pie/donut don't have x/y axis
  chart: ApexChart;
  labels: string[];
  colors: string[];
  responsive: ApexResponsive[];
}

export interface RadarChart {
  chart: ApexChart;
  series: ApexAxisChartSeries;
  labels: string[];
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  colors: string[];
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
}

export interface RadialBarChart {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  series: number[];
  labels: string[];
  responsive: ApexResponsive[];
  colors: string[];
}

export interface DonutChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  legend: ApexLegend;
  colors: string[];
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
}

export interface RadarChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  labels: string[];
  colors: string[];
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
  stroke?: ApexStroke;
  fill?: ApexFill;
  dataLabels?: ApexDataLabels;
}

export interface RadialBarChartOptions {
  series: number[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  colors: string[];
  labels: string[];
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
}
