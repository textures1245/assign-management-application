// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import colorLib from '@kurkle/color';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import { valueOrDefault } from 'chart.js/helpers';

let _seed: number = Date.now();

export function srand(seed: number): void {
  _seed = seed;
}

export function rand(min: number, max: number): number {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config?: {
  min?: number;
  max?: number;
  from?: number[];
  count?: number;
  decimals?: number;
  continuity?: number;
}): number[] {
  const cfg = config || {};
  const min = valueOrDefault(cfg.min, 0);
  const max = valueOrDefault(cfg.max, 100);
  const from = valueOrDefault(cfg.from, []);
  const count = valueOrDefault(cfg.count, 8);
  const decimals = valueOrDefault(cfg.decimals, 8);
  const continuity = valueOrDefault(cfg.continuity, 1);
  const dfactor = Math.pow(10, decimals) || 0;
  const data: number[] = [];
  let value: number;

  for (let i = 0; i < count; ++i) {
    value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function points(config?: {
  min?: number;
  max?: number;
  from?: number[];
  count?: number;
  decimals?: number;
  continuity?: number;
}): { x: number; y: number }[] {
  const xs = numbers(config);
  const ys = numbers(config);
  return xs.map((x, i) => ({ x, y: ys[i] }));
}

export function bubbles(config?: {
  min?: number;
  max?: number;
  from?: number[];
  count?: number;
  decimals?: number;
  continuity?: number;
  rmin?: number;
  rmax?: number;
}): { x: number; y: number; r: number }[] {
  return points(config).map(pt => {
    pt.r = rand(config.rmin, config.rmax);
    return pt;
  });
}

export function labels(config?: {
  min?: number;
  max?: number;
  count?: number;
  decimals?: number;
  prefix?: string;
}): string[] {
  const cfg = config || {};
  const min = cfg.min || 0;
  const max = cfg.max || 100;
  const count = cfg.count || 8;
  const step = (max - min) / count;
  const decimals = cfg.decimals || 8;
  const dfactor = Math.pow(10, decimals) || 0;
  const prefix = cfg.prefix || '';
  const values: string[] = [];

  for (let i = min; i < max; i += step) {
    values.push(prefix + Math.round(dfactor * i) / dfactor);
  }

  return values;
}

const MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function months(config?: { count?: number; section?: number }): string[] {
  const cfg = config || {};
  const count = cfg.count || 12;
  const section = cfg.section;
  const values: string[] = [];

  for (let i = 0; i < count; ++i) {
    const value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

const COLORS: string[] = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba',
];

export function color(index: number): string {
  return COLORS[index % COLORS.length];
}

export function transparentize(value: string, opacity?: number): string {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS: { [key: string]: string } = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

const NAMED_COLORS: string[] = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
];

export function namedColor(index: number): string {
  return NAMED_COLORS[index % NAMED_COLORS.length];
}

export function newDate(days: number): Date {
  return DateTime.now().plus({ days }).toJSDate();
}

export function newDateString(days: number): string {
  return DateTime.now().plus({ days }).toISO();
}

export function parseISODate(str: string): DateTime {
  return DateTime.fromISO(str);
}
