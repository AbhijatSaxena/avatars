import type { IStyle } from '@avatars/core';
import qrImage from 'qr-image';

type IOptions = {
  color?: string;
  correctionLevel?: 'L' | 'M' | 'Q' | 'H';
};

const Style: IStyle<IOptions> = function (prng, options) {
  options = {
    correctionLevel: 'M',
    color: '#000',
    ...options,
  };

  let svg = qrImage
    .imageSync(prng.seed, {
      type: 'svg',
      ec_level: options.correctionLevel,
      margin: 0,
    })
    .toString();

  svg = svg.replace('<path ', `<path fill="${options.color}" `);

  return svg;
};

export default Style;
