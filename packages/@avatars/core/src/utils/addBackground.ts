import getViewbox from './getViewbox';

export default function addBackground(svg: svgson.schema, background: string) {
  let viewBox = getViewbox(svg);

  svg.children.unshift({
    name: 'rect',
    type: 'element',
    value: '',
    children: [],
    attributes: {
      fill: background,
      width: viewBox.width.toString(),
      height: viewBox.height.toString(),
      x: viewBox.x.toString(),
      y: viewBox.y.toString(),
    },
  });

  return this;
}
