![DiceBear Avatars - Human Sprite Collection](https://raw.githubusercontent.com/DiceBear/avatars/master/packages/avatars-human-sprites/banner.svg?sanitize=true)

![license](https://img.shields.io/npm/l/@avatars/human.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/@avatars/human-sprites.svg?style=flat-square)](https://www.npmjs.com/package/@dicebear/avatars-human)

This Sprite Collection combines the Sprite Collections [male](https://www.npmjs.com/package/@avatars/male-sprites) and [female](https://www.npmjs.com/package/@dicebear/avatars-female) and selects the gender randomly.

<p>
    <img src="https://avatars.dicebear.com/api/human/1.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/2.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/3.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/4.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/5.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/6.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/7.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/8.svg" width="60" />
    <img src="https://avatars.dicebear.com/api/human/9.svg" width="60" />
</p>

## Usage

### HTTP-API (recommended)

Our free HTTP-API is the easiest way to use this sprite collection. Just use the following URL as image source.

    https://avatars.dicebear.com/api/human/:seed.svg

The value of `:seed` can be anything you like - but **don't** use any sensitive or personal data here! The GET parameter
`options` can be used to pass [options](#options).

#### Examples

| preview                                                                                          | url                                                                     |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| <img src="https://avatars.dicebear.com/api/human/example.svg" width="60" />                       | https://avatars.dicebear.com/api/human/example.svg                       |
| <img src="https://avatars.dicebear.com/api/human/example.svg?options[mood][]=happy" width="60" /> | https://avatars.dicebear.com/api/human/example.svg?options[mood][]=happy |
| <img src="https://avatars.dicebear.com/api/human/example.svg?options[mood][]=sad" width="60" />   | https://avatars.dicebear.com/api/human/example.svg?options[mood][]=sad   |

### NPM

Install the Avatars and this sprite collection with the following command.

    npm install --save @avatars/core @avatars/human

Now you are ready to create your first Avatar.

```js
import Avatars from '@avatars/core';
import sprites from '@avatars/human';

let options = {};
let avatars = new Avatars(sprites, options);
let svg = avatars.create('custom-seed');
```

## Options

| name       | type             | default                         | description                                                                                                                                       |
| ---------- | ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| radius     | number           | `0`                             | Avatar border radius                                                                                                                              |
| base64     | bool             | `false`                         | Return avatar as base64 data uri instead of XML <br> **Not supported by the HTTP API**                                                            |
| width      | number           | `null`                          | Fixed width                                                                                                                                       |
| height     | number           | `null`                          | Fixed height                                                                                                                                      |
| margin     | number           | `0`                             | Avatar margin in percent<br> **HTTP-API limitation** Max value `25`                                                                               |
| background | string           | `null`                          | Any valid color identifier<br> **HTTP-API limitation** Only hex _(3-digit, 6-digit and 8-digit)_ values are allowed. Use url encoded hash: `%23`. |
| userAgent  | string           | `window.navigator.userAgent`    | User-Agent for legacy browser fallback<br> **Automatically detected by the HTTP API**                                                             |
| skinColor  | array of numbers | `null`                          | Possible values: `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`                                                                    |
| mood       | array of strings | `['happy', 'sad', 'surprised']` | Possible values: `sad`, `happy`, `surprised`                                                                                                      |

## Further information

You can find the DiceBear Avatars documentation at [avatars.dicebear.com](https://avatars.dicebear.com)
