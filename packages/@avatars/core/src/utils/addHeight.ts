export default function addHeight(svg: svgson.schema, height: number) {
  svg.attributes['height'] = height.toString();

  return this;
}
