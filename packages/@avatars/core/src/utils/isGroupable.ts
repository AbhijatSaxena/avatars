export default function isGroupable(element: svgson.schema) {
  return element.type === 'element' && ['title', 'desc', 'defs', 'metadata'].indexOf(element.name) === -1;
}
