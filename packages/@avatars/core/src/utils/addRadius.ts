import getViewbox from './getViewbox';
import isGroupable from './isGroupable';

export default function addRadius(svg: svgson.schema, radius: number) {
  let viewBox = getViewbox(svg);
  let groupable: svgson.schema[] = [];

  svg.children = svg.children.filter((child) => {
    if (isGroupable(child)) {
      groupable.push(child);

      return false;
    }

    return true;
  });

  svg.children.push(
    {
      name: 'mask',
      type: 'element',
      value: '',
      children: [
        {
          name: 'rect',
          type: 'element',
          value: '',
          children: [],
          attributes: {
            width: viewBox.width.toString(),
            height: viewBox.height.toString(),
            rx: ((viewBox.width * radius) / 100).toString(),
            ry: ((viewBox.height * radius) / 100).toString(),
            fill: '#fff',
            x: viewBox.x.toString(),
            y: viewBox.y.toString(),
          },
        },
      ],
      attributes: {
        id: 'avatarsRadiusMask',
      },
    },
    {
      name: 'g',
      type: 'element',
      value: '',
      children: groupable,
      attributes: {
        mask: `url(#avatarsRadiusMask)`,
      },
    }
  );

  return this;
}
