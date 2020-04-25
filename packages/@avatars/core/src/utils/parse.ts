import { parseSync } from 'svgson';

export default function parse(svg: string | svgson.schema) {
  return typeof svg === 'string' ? parseSync(svg) : svg;
}
