# Usage

First install the library and an avatar style. Then you can create your first avatar as described below.

## NPM

```js
// Import the library and your avatar style.
const Avatars = require('@avatars/core');

// Register your avatar style, if you use not an official one.
// Avatars.use('custom-avatar-style', require('custom-avatar-style'));

// Define a seed. The same seed will always create the same avatar.
const seed = 'your-custom-seed';

// Define options that only apply to your next avatar. They are combined with the default options.
const options = {};

// The `create` method creates an avatar for you and returns the SVG source code. Replace `identicon` with the name of your choosen avatar style.
const svg = Avatars.create('identicon', seed, options);
```

## CDN

With the CDN, library and avatar styles are bound to the window object.

```js
// Register your avatar style, if you use not an official one.
// Avatars.use('custom-avatar-style', require(CustomAvatarStyle));

// Define a seed. The same seed will always create the same avatar.
const seed = 'your-custom-seed';

// Define options that only apply to your next avatar. They are combined with the default options.
const options = {};

// The `create` method creates an avatar for you and returns the SVG source code. Replace `identicon` with the name of your choosen avatar style.
const svg = Avatars.create('identicon', seed, options);
```

## HTTP API
