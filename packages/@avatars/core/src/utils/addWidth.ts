export default function addWidth(svg: svgson.schema, width: number) {
  svg.attributes['width'] = width.toString();

  return this;
}
