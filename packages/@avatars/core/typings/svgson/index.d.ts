declare module 'svgson' {
  export interface schema {
    name: string;
    type: string;
    value: string;
    children: schema[];
    attributes: {
      [key: string]: string;
    };
  }
  export function parse(svg: string): Promise<schema>;
  export function parseSync(svg: string): schema;
  export function stringify(svg: schema): string;
}
