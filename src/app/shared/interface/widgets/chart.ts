import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export interface CommonLineCharts {
  id: number;
  title: string;
  value: string;
  description: string;
  increase_value: string;
  chart_details: ChartDetails;
}

export interface CommonLineChartInput {
  categories: string[];
  colors: string;
  series: number[];
}

export interface ChartDetails {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  fill: ApexFill;
  colors: string[];
  series: ApexAxisChartSeries;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
}

export interface TotalSaleChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  title: string;
  amount: string;
  percentage: string;
}

export interface TotalProductChart {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  fill: ApexFill;
  colors: string[];
  series: ApexAxisChartSeries;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  title: string;
  amount: string;
  percentage: string;
}

export interface CreatedProjectChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  colors: string[];
  fill: ApexFill;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  tooltip: ApexTooltip;
}

export interface TotalProjectChart {
  series: ApexAxisChartSeries;
  colors: string[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  fill: ApexFill;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  title: string;
  amount: string;
  percentage: string;
}
export interface MonthlyHistoryChart {
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
  responsive: ApexResponsive[];
}

export interface SkillStatusChart {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  series: number[];
  labels: string[];
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
}

export interface OrderStatusChart {
  chart_details: OrderStatusChartDetails;
}

export interface OrderStatusChartDetails {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  fill: ApexFill;
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface OrderStatusChartOption {
  colors: string;
  series: number;
  categories: string;
}

export interface LiveProductChart {
  chart: ApexChart;
  stroke: ApexStroke;
  series: ApexAxisChartSeries;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis[];
  tooltip: ApexTooltip;
}

export interface TurnOverCharts {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  fill: ApexFill;
  colors: string[];
  series: ApexAxisChartSeries;
  tooltip: ApexTooltip;
}

export interface CryptoCurrencyPriceChart {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  fill: ApexFill;
  colors: string[];
  series: ApexAxisChartSeries;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
}

export interface CryptoAnnotationChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  annotations: ApexAnnotations;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  colors: string[];
  labels: string[];
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
}

export interface StockMarketChart {
  series: ApexAxisChartSeries;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  fill: ApexFill;
  chart: ApexChart;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  responsive: ApexResponsive[];
}

export interface FinanceChart {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  fill: ApexFill;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

export interface GeneralSalesStatsChart {
  series: number[];
  chart: ApexChart;
  stroke: ApexStroke;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

export interface OrderStatusChart2 {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  fill: ApexFill;
  colors: string[];
  markers: ApexMarkers;
  series: ApexAxisChartSeries;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

export interface MonthlySalesChart {
  fill: ApexFill;
  colors: string[];
  chart: ApexChart;
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  markers: ApexMarkers;
  labels: string[];
}

export interface UsersChart {
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  series: ApexAxisChartSeries;
  fill: ApexFill;
  colors: string[];
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
}

export interface SaleOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  grid: ApexGrid;
  labels: string[];
  markers: ApexMarkers;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  fill: ApexFill;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
}

export interface ProgressChartOptions1 {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  fill: ApexFill;
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface ProgressChartOptions2 {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  colors: string[];
  responsive: ApexResponsive[];
}

export interface ProgressChartOptions3 {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface ProgressChartOptions4 {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  series: ApexAxisChartSeries;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface ProgressChartOptions5 {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  series: ApexAxisChartSeries;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface AverageSalesChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  title: string;
  details: string;
  percentage: string;
}

export interface AverageProfitOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions;
  colors?: string[];
  stroke?: ApexStroke;
  responsive?: ApexResponsive[];
  title?: string;
  details?: string;
  percentage?: string;
}

export interface FollowersChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  grid: ApexGrid;
  colors: string[];
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  fill: ApexFill;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
}

export interface VisitorsChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  colors: string[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  fill: ApexFill;
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

export interface DataChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
}

export interface OrderChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
  fill?: ApexFill;
}

export interface WidgetChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions?: ApexPlotOptions;
  colors: string[];
  dataLabels?: ApexDataLabels;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  responsive: ApexResponsive[];
  fill?: ApexFill;
  icon: string;
  type: string;
  name: string;
}

export interface TotalChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  title: string;
  data: string;
}

export interface RadialChartInput {
  color: string[];
  dropshadowColor: string;
  radialYseries: number[];
  averageTitle: string;
  average: string;
  parsonage: string;
  desc: string;
}

export interface RadialChartOptions {
  series: number[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  labels: string[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  fill: ApexFill;
  averageTitle: string;
  average: string;
  parsonage: string;
  desc: string;
}

export interface SocialMediaChartOptions {
  series: number[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
  labels: string[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  fill: ApexFill;

  averageTitle?: string;
  average?: string;
  parsonage?: string;
  desc?: string;
  name: string;
  image: string;
  pr: string;
  followers: string;
}

export interface SocialMediaInput {
  color: string[];
  dropshadowColor: string;
  radialYseries: number[];
  averageTitle?: string;
  average?: string;
  parsonage?: string;
  desc?: string;
  name: string;
  image: string;
  pr: string;
  followers: string;
}
export interface OrderChartData {
  color: string[];
  dropshadowColor?: string;
  label: string[];
  orderYseries: number[];
  name: string;
  percentage: string;
  class1: string;
  class2: string;
  price: string;
  icon: string;
  icon2: string;
  des: string;
  responsive?: ApexResponsive[];
}

export interface OrderChartOption {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  stroke: ApexStroke;
  labels: string[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  responsive: ApexResponsive[];
  fill?: ApexFill;
  name: string;
  percentage: string;
  class1: string;
  class2: string;
  price: string;
  icon: string;
  icon2: string;
  des: string;
}

export interface RadialChartOption {
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  stroke: ApexStroke;
  series: number[];
  responsive: ApexResponsive[];
}

export interface SalesSummaryOptions2 {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  colors: string[];
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  fill: ApexFill;
  tooltip: ApexTooltip;
  states: ApexStates;
  responsive: ApexResponsive[];
}

export interface SalesSummaryOptions1 {
  series: {
    name: string;
    type?: 'line' | 'area' | 'bar';
    data: number[];
  }[];
  chart: ApexChart;
  stroke: ApexStroke;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  colors: string[];
  fill: ApexFill;
  labels: string[];
  annotations: ApexAnnotations;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: { show: boolean };
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  dataLabels: ApexDataLabels;
}
