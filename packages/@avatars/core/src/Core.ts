import Random from './Random';
import Parser from './Parser';

export type Options = {
  [id: string]: any;
};

export type Fn = (random: Random, options?: Options) => string | svgson.schema;

export default class Core {
  static styles: {
    [style: string]: Fn;
  } = {};

  static use(style: string, fn?: Fn) {
    if (this._has(style)) {
      throw Error(`The avatar style with the name ${style} is already registered.`);
    }

    if (undefined === style) {
      try {
        fn = require(`@avatars/${style}`).default;
      } catch {
        if (typeof window !== 'undefined') {
          // @ts-ignore
          fn = window[`Avatars${style}`];
        }
      }

      if (undefined === style) {
        throw new Error(
          `Could not found avatar style ${style}. Follow installation instruductions for "@avatars/${style}" if it exists.`
        );
      }
    }

    this.styles[style] = fn;

    return this;
  }

  static create(style: string, seed: string, options: Options = {}) {
    if (false === this._has(style)) {
      this.use(style);
    }

    const fn = this._get(style);

    let svg = Parser.parse(fn(new Random(seed), options));

    if (options.width) {
      this._addWidth(svg, options.width);
    }

    if (options.height) {
      this._addHeight(svg, options.height);
    }

    if (options.margin) {
      this._addMargin(svg, options.margin);
    }

    if (options.background) {
      this._addBackground(svg, options.background);
    }

    if (options.radius) {
      this._addRadius(svg, options.radius);
    }

    return options.base64
      ? `data:image/svg+xml;base64,${this._base64EncodeUnicode(Parser.stringify(svg))}`
      : Parser.stringify(svg);
  }

  static _has(style: string) {
    return !!this._get(style);
  }

  static _get(style: string) {
    return this.styles[style];
  }

  static _addWidth(svg: svgson.schema, width: number) {
    svg.attributes['width'] = width.toString();

    return this;
  }

  static _addHeight(svg: svgson.schema, height: number) {
    svg.attributes['height'] = height.toString();

    return this;
  }

  static __getViewbox(svg: svgson.schema) {
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

  static _addBackground(svg: svgson.schema, background: string) {
    let viewBox = this.__getViewbox(svg);

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

  static _addRadius(svg: svgson.schema, radius: number) {
    let viewBox = this.__getViewbox(svg);
    let groupable: svgson.schema[] = [];

    svg.children = svg.children.filter((child) => {
      if (this._isGroupable(child)) {
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

  static _addMargin(svg: svgson.schema, margin: number) {
    let viewBox = this.__getViewbox(svg);
    let groupable: svgson.schema[] = [];

    svg.children = svg.children.filter((child) => {
      if (this._isGroupable(child)) {
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

  static _isGroupable(element: svgson.schema) {
    return element.type === 'element' && ['title', 'desc', 'defs', 'metadata'].indexOf(element.name) === -1;
  }

  static _base64EncodeUnicode(value: string) {
    // @see https://www.base64encoder.io/javascript/
    let utf8Bytes = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(`0x${p1}`));
    });

    return btoa(utf8Bytes);
  }
}
