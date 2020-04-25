import { Random } from './models';
import {
  addBackground,
  addHeight,
  addMargin,
  addRadius,
  addWidth,
  base64EncodeUnicode,
  stringify,
  parse,
} from './utils';

export type Options = {
  [id: string]: any;
};

export type Fn = (random: Random, options?: Options) => string | svgson.schema;

let styles: {
  [style: string]: Fn;
} = {};

export function use(style: string, fn?: Fn) {
  if (styles[style]) {
    throw Error(`The avatar style with the name ${style} is already registered.`);
  }

  if (undefined === style) {
    try {
      fn = require(`@avatars/${style}`).default;
    } catch {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        fn = window[`Avatars${style}`];
      }
    }

    if (undefined === style) {
      throw new Error(
        `Could not found avatar style ${style}. Follow installation instruductions for "@avatars/${style}" if it exists.`
      );
    }
  }

  styles[style] = fn;

  return this;
}

export function create(style: string, seed: string, options: Options = {}) {
  if (undefined === styles[style]) {
    use(style);
  }

  const fn = styles[style];

  let svg = parse(fn(new Random(seed), options));

  if (options.width) {
    addWidth(svg, options.width);
  }

  if (options.height) {
    addHeight(svg, options.height);
  }

  if (options.margin) {
    addMargin(svg, options.margin);
  }

  if (options.background) {
    addBackground(svg, options.background);
  }

  if (options.radius) {
    addRadius(svg, options.radius);
  }

  return options.base64 ? `data:image/svg+xml;base64,${base64EncodeUnicode(stringify(svg))}` : stringify(svg);
}
