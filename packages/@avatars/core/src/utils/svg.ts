import * as svgson from 'svgson';

export function addBackground(svg: svgson.schema, background: string) {
  let viewBox = getViewbox(svg);

  svg.children.unshift({
    type: 'element',
    name: 'rect',
    children: [],
    value: '',
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

export function addHeight(svg: svgson.schema, height: number) {
  svg.attributes['height'] = height.toString();

  return this;
}

export function addMargin(svg: svgson.schema, margin: number) {
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
    type: 'element',
    name: 'g',
    value: '',
    children: [
      {
        type: 'element',
        name: 'g',
        value: '',
        children: [
          {
            type: 'element',
            name: 'rect',
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

export function addRadius(svg: svgson.schema, radius: number) {
  let viewBox = getViewbox(svg);
  let groupable: svgson.schema[] = [];

  svg.children = svg.children.filter((child) => {
    if (child.type == 'element' && isGroupable(child)) {
      groupable.push(child);

      return false;
    }

    return true;
  });

  svg.children.push(
    {
      type: 'element',
      name: 'mask',
      value: '',
      children: [
        {
          type: 'element',
          name: 'rect',
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
      type: 'element',
      name: 'g',
      value: '',
      children: groupable,
      attributes: {
        mask: `url(#avatarsRadiusMask)`,
      },
    }
  );

  return this;
}

export function addWidth(svg: svgson.schema, width: number) {
  svg.attributes['width'] = width.toString();

  return this;
}

export function getViewbox(svg: svgson.schema) {
  let viewBox = svg.attributes['viewBox'].split(' ');
  let x = parseInt(viewBox[0]);
  let y = parseInt(viewBox[1]);
  let width = parseInt(viewBox[2]);
  let height = parseInt(viewBox[3]);

  return {
    x,
    y,
    width,
    height,
  };
}

export function isGroupable(element: svgson.schema) {
  return element.type == 'element' && ['title', 'desc', 'defs', 'metadata'].indexOf(element.name) === -1;
}

export function parse(svg: string | svgson.schema) {
  return typeof svg === 'string' ? svgson.parseSync(svg) : svg;
}

export function stringify(svg: string | svgson.schema) {
  return typeof svg === 'string' ? svg : svgson.stringify(svg);
}
