import getViewbox from './getViewbox';
import isGroupable from './isGroupable';

export default function addMargin(svg: svgson.schema, margin: number) {
  let viewBox = getViewbox(svg);
  let groupable: svgson.schema[] = [];

  svg.children = svg.children.filter((child) => {
    if (isGroupable(child)) {
      groupable.push(child);

      return false;
    }

    return true;
  });

  svg.children.push({
    name: 'g',
    type: 'element',
    value: '',
    children: [
      {
        name: 'g',
        type: 'element',
        value: '',
        children: [
          {
            name: 'rect',
            type: 'element',
            value: '',
            children: [],
            attributes: {
              fill: 'none',
              width: viewBox.width.toString(),
              height: viewBox.height.toString(),
              x: viewBox.x.toString(),
              y: viewBox.y.toString(),
            },
          },
          ...groupable,
        ],
        attributes: {
          transform: `scale(${1 - (margin * 2) / 100})`,
        },
      },
    ],
    attributes: {
      transform: `translate(${(viewBox.width * margin) / 100}, ${(viewBox.height * margin) / 100})`,
    },
  });

  return this;
}
