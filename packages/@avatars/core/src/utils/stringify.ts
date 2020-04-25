import { stringify as stringifySync } from 'svgson';

export default function stringify(svg: string | svgson.schema) {
  return typeof svg === 'string' ? svg : stringifySync(svg);
}
