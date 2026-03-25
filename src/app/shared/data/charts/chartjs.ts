import { ChartDataset, ChartOptions } from 'chart.js';

let primary_color = localStorage.getItem('primary_color') || '#43B9B2';
let secondary_color = localStorage.getItem('secondary_color') || '#C280D2';
let tertiary_color = '#FD7E40';
let info_color = '#2E8DD3';

//chart 1//
// Labels
export const barChartChartLabels: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

// Type
export const barChartChartType: 'line' = 'line';

// Options
export const barChartChartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Logarithmic',
    },
  },
};

// Data
export const barChartChartData: ChartDataset<'line'>[] = [
  {
    label: 'APAC RE Index',
    backgroundColor: primary_color,
    borderColor: primary_color,
    fill: false,
    data: [10, 20, 30, 40, 100, 50, 150],
  },
  {
    label: 'APAC PME',
    backgroundColor: primary_color,
    borderColor: primary_color,
    fill: false,
    data: [50, 300, 100, 450, 150, 200, 300],
  },
];

//chart 2//

export var basicLineLabels: string[] = [
  'Q1',
  'Q2',
  'Q3',
  'Q4',
  'Q5',
  'Q6',
  'Q7',
  'Q8',
  'Q9',
  'Q10',
  'Q11',
];
export const basicLineChartType: 'bar' = 'bar';

// Options

export const basicLineChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Gross Volume in 2023',
    },
  },
};
export const basicChartData: ChartDataset<'bar'>[] = [
  {
    label: 'Gross volume ($)',
    backgroundColor: primary_color,
    borderColor: '#F4F5F8',
    data: [26900, 28700, 27300, 29200, 26900, 28700, 27300, 29200, 28700, 27300, 29200],
  },
  {
    label: 'Gross volume ($)',
    backgroundColor: secondary_color,
    borderColor: '#F4F5F8',
    data: [27800, 26200, 21200, 24200, 22000, 27000, 27000, 25200, 23600, 22100, 24200],
  },
];

// chart 3//

// Options
export const radarGraphOptions: ChartOptions<'radar'> = {
  responsive: true,
  scales: {
    r: {
      grid: {
        lineWidth: 1,
      },
    },
  },
};

// Labels
export const radarGraphLabels: string[] = [
  'English',
  'Maths',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
];

// Chart type
export const radarGraphType: 'radar' = 'radar';

// Data
export const radarGraphData: ChartDataset<'radar'>[] = [
  {
    label: 'Student A',
    backgroundColor: 'rgba(67,185,178,0.2)',
    borderColor: 'rgba(67,185,178,1)',
    pointBackgroundColor: 'rgba(67,185,178,1)',
    data: [65, 75, 70, 80, 60, 80],
  },
  {
    label: 'Student B',
    backgroundColor: 'rgba(194,128,210,0.2)',
    borderColor: 'rgba(194,128,210,1)',
    pointBackgroundColor: 'rgba(194,128,210,1)',
    data: [54, 65, 60, 70, 70, 75],
  },
];

//chart4//

export const radarGraph2Options: ChartOptions<'line'> = {
  responsive: true,
  layout: {
    padding: 10,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Precipitation in Toronto',
    },
  },
};

// Labels
export const radarGraph2Labels: string[] = [
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
];

// Chart type
export const radarGraph2Type: 'line' = 'line';

// Data
export const radarGraph2Data: ChartDataset<'line'>[] = [
  {
    label: 'Rainfall',
    backgroundColor: tertiary_color,
    borderColor: tertiary_color,
    fill: false, // optional for line charts
    data: [26.4, 39.8, 66.8, 66.4, 40.6, 55.2, 77.4, 69.8, 57.8, 76, 110.8, 142.6],
  },
];

//chart 5 //

export const RadarGraph3Options: ChartOptions<'polarArea'> = {
  responsive: true,
  layout: {
    padding: 10,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Precipitation in Toronto',
    },
  },
};

// Labels
export const RadarGraph3Labels: string[] = ['Mon', 'Tue', 'Wed', 'Thu'];

// Chart type
export const RadarGraph3Type: 'polarArea' = 'polarArea';

// Data
export const RadarGraph3Data: ChartDataset<'polarArea'>[] = [
  {
    data: [5000, 1050, 2424, 3440],
    borderColor: [primary_color, secondary_color, tertiary_color, info_color],
    backgroundColor: [
      'rgba(67,185,178,0.2)',
      'rgba(194,128,210,0.2)',
      'rgba(253,126,64,0.2)',
      'rgba(46,141,211,0.2)',
    ],
    borderWidth: 1,
  },
];

// Options
export const DonutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
};

// Labels
export const DonutLabels: string[] = ['Tokyo', 'Mumbai', 'Mexico City', 'Shanghai'];

// Chart type
export const DonutType: 'doughnut' = 'doughnut';

// Data
export const DonutData: ChartDataset<'doughnut'>[] = [
  {
    data: [1424, 250, 500, 1040],
    borderColor: [primary_color, secondary_color, tertiary_color, info_color],
    backgroundColor: [primary_color, secondary_color, tertiary_color, info_color],
    borderWidth: 1,
  },
];
