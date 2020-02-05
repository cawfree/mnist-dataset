# mnist-dataset
✍️ Yann LeCun's MNIST handwritten digit dataset, made available to Node.js. This library contains all of the utilities you need to download and parse the raw unfiltered dataset, which is expressed as JSON arrays. It uses [fs](https://nodejs.org/api/fs.html) to cache to your system's [`tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir) so that you don't have to keep downloading the dataset between successive executions of your software.

<a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>

<br />
<br />

<p align="center">
  <img src="./public/image.jpeg" width="480" height="360" />
</p>

## 🚀 Getting Started

Using [`npm`]():

```bash
npm install --save mnist-dataset
```

Using [`yarn`]():

```bash
yarn add mnist-dataset
```

## ✍️ Usage

```javascript
import { cache, trainingImagesUrl, trainingLabelsUrl } from 'mnist-dataset';

(
  async () => {
    const trainingImages = await cache(trainingImagesUrl); // [[Number]] (i.e. [[0, 0, 0, ...], [0, 0, 0, ...], ...])
    const trainingLabels = await cache(trainingLabelsUrl); // [[Number]] (i.e. [[7], [2], ...])

    const toString = e =>
      [...Array(28)]
        .map((_, i) =>
          [...Array(28)].map((_, j) => (e[i * 28 + j] > 128 ? "#" : " ")).join("")
        )
        .join("\n");

    const [number7] = trainingImages;
    console.log(toString(number7));
  }
)();
```

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)

<p align="center">
  <a href="https://www.buymeacoffee.com/cawfree">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy @cawfree a coffee" width="232" height="50" />
  </a>
</p>
