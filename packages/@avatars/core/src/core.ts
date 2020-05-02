import * as svg from './utils/svg';
import * as base64 from './utils/base64';
import * as prng from './utils/prng';
import * as svgson from 'svgson';

export interface IOptions {
  width: number;
  height: number;
  margin: number;
  background: string;
  radius: number;
  base64: boolean;
}

export interface IStyle<O = {}> {
  (prng: prng.IPrng, options: Partial<O & IOptions>): string | svgson.INode;
}

export function create<O = {}>(style: IStyle<O>, seed: string, options: Partial<O & IOptions> = {}) {
  let avatar = svg.parse(style(prng.create(seed), options));

  if (options.width) {
    svg.addWidth(avatar, options.width);
  }

  if (options.height) {
    svg.addHeight(avatar, options.height);
  }

  if (options.margin) {
    svg.addMargin(avatar, options.margin);
  }

  if (options.background) {
    svg.addBackground(avatar, options.background);
  }

  if (options.radius) {
    svg.addRadius(avatar, options.radius);
  }

  return options.base64
    ? `data:image/svg+xml;base64,${base64.encodeUnicode(svg.stringify(avatar))}`
    : svg.stringify(avatar);
}
