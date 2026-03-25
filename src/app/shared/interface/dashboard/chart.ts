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
  ApexMarkers,
  ApexGrid,
  ApexResponsive,
  ApexAnnotations,
  ApexStates,
} from 'ng-apexcharts';

export interface DonutChart {
  series: number[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
  responsive: ApexResponsive[];
}

export interface TotalClientsChart {
  series: ApexAxisChartSeries;
  colors: string[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
}

export interface TotalRevenuesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title?: ApexTitleSubtitle;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface MixedChart {
  series: {
    name: string;
    type: 'line' | 'area' | 'bar';
    data: number[];
  }[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  stroke: ApexStroke;
  colors: string[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  grid: ApexGrid;
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

export interface BarChartOptions {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  colors: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  grid: ApexGrid;
  fill: ApexFill;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
}

export interface SparklineChart {
  series: { name: string; data: number[] }[];
  chart: ApexChart;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  colors: string[];
}

export interface TotalClientOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  title: string;
  number: number;
  class: string;
  colors: string[];
  tooltip?: ApexTooltip;
}

export interface NewProjectOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  colors: string[];
  responsive: ApexResponsive[];
  title?: string;
  number?: number;
  class?: string;
}

export interface InvestingChartOptions {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  states: ApexStates;
}

export interface TaskSummaryChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  annotations: ApexAnnotations;
  colors: string[];
  legend: { show: boolean };
  responsive: ApexResponsive[];
}

export interface InvestmentChartOptions {
  series: number[]; // just numbers for polarArea
  chart: ApexChart;
  stroke: ApexStroke;
  colors: string[];
  fill: ApexFill;
  grid: ApexGrid;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
}

export interface MonthlyOverviewChartOptions {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
}

export interface TotalVisitChartOptions {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  colors: string[];
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend?: ApexLegend;
  responsive?: ApexResponsive[];
}

export interface TotalEarningsChartOptions {
  series: {
    data: number[];
  }[];
  chart: ApexChart;
  colors: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  legend: ApexLegend;
  xaxis: ApexXAxis & { categories?: string[] };
  yaxis: ApexYAxis & { categories?: string[] };
  responsive: ApexResponsive[];
}

export interface DashboardWidgetOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors?: string[];
  fill: ApexFill;
  stroke?: ApexStroke;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  markers?: ApexMarkers;
  legend?: ApexLegend;
  grid?: ApexGrid;
  yaxis?: ApexYAxis | ApexYAxis[];
  xaxis?: ApexXAxis;
  responsive?: ApexResponsive[];
  tooltip?: ApexTooltip;
  title?: string;
  number?: number;
  class?: string;
}

export interface TeamChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  colors: string[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  legend: ApexLegend;
  yaxis: ApexYAxis | ApexYAxis[];
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
}
