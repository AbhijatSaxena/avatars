import type { Root, Element } from 'hast';
import * as svgParser from 'svg-parser';
import stringifyHast from 'hast-util-to-html';

export function getSvgElement(root: svgParser.RootNode) {
  return root.children.find((child) => {
    return child.type == 'element' && child.tagName == 'svg';
  });
}

export function addBackground(svg: Element, background: string) {
  let viewBox = getViewbox(svg);

  svg.children.unshift({
    type: 'element',
    tagName: 'rect',
    children: [],
    properties: {
      fill: background,
      width: viewBox.width,
      height: viewBox.height,
      x: viewBox.x,
      y: viewBox.y,
    },
  });

  return this;
}

export function addHeight(svg: Element, height: number) {
  svg.properties['height'] = height;

  return this;
}

export function addMargin(svg: Element, margin: number) {
  let viewBox = getViewbox(svg);
  let groupable: Element[] = [];

  svg.children = svg.children.filter((child) => {
    if (child.type == 'element' && isGroupable(child)) {
      groupable.push(child);

      return false;
    }

    return true;
  });

  svg.children.push({
    type: 'element',
    tagName: 'g',
    children: [
      {
        type: 'element',
        tagName: 'g',
        value: '',
        children: [
          {
            type: 'element',
            tagName: 'rect',
            children: [],
            properties: {
              fill: 'none',
              width: viewBox.width,
              height: viewBox.height,
              x: viewBox.x,
              y: viewBox.y,
            },
          },
          ...groupable,
        ],
        properties: {
          transform: `scale(${1 - (margin * 2) / 100})`,
        },
      },
    ],
    properties: {
      transform: `translate(${(viewBox.width * margin) / 100}, ${(viewBox.height * margin) / 100})`,
    },
  });

  return this;
}

export function addRadius(svg: Element, radius: number) {
  let viewBox = getViewbox(svg);
  let groupable: Element[] = [];

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
      tagName: 'mask',
      children: [
        {
          type: 'element',
          tagName: 'rect',
          children: [],
          properties: {
            width: viewBox.width,
            height: viewBox.height,
            rx: (viewBox.width * radius) / 100,
            ry: (viewBox.height * radius) / 100,
            fill: '#fff',
            x: viewBox.x,
            y: viewBox.y,
          },
        },
      ],
      properties: {
        id: 'avatarsRadiusMask',
      },
    },
    {
      type: 'element',
      tagName: 'g',
      children: groupable,
      properties: {
        mask: `url(#avatarsRadiusMask)`,
      },
    }
  );

  return this;
}

export function addWidth(svg: Element, width: number) {
  svg.properties['width'] = width;

  return this;
}

export function getViewbox(svg: Element) {
  let viewBox = svg.properties['viewBox'].split(' ');
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

export function isGroupable(element: Element) {
  return ['title', 'desc', 'defs', 'metadata'].indexOf(element.tagName) === -1;
}

export function parse(svg: string | svgParser.RootNode) {
  return typeof svg === 'string' ? svgParser.parse(svg) : svg;
}

export function stringify(svg: string | svgParser.RootNode) {
  return typeof svg === 'string' ? svg : stringifyHast(svg);
}
