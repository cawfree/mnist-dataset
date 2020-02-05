/**
 * @jest-environment node
 */
import "@babel/polyfill";

import fs from "fs";
import { sep } from "path";

import {
  cache,
  trainingImagesUrl,
  trainingLabelsUrl,
  testImagesUrl,
  testLabelsUrl
} from "../src";

jest.setTimeout(60 * 1000);

const toString = e =>
  [...Array(28)]
    .map((_, i) =>
      [...Array(28)].map((_, j) => (e[i * 28 + j] > 128 ? "#" : " ")).join("")
    )
    .join("\n");

it("should download mnist data", async () => {
  const [
    trainingImages,
    trainingLabels,
    testImages,
    testLabels
  ] = await Promise.all(
    Object.entries({
      "train-images-idx3-ubyte.json": trainingImagesUrl,
      "train-labels-idx1-ubyte.json": trainingLabelsUrl,
      "t10k-images-idx3-ubyte.json": testImagesUrl,
      "t10k-labels-idx1-ubyte.json": testLabelsUrl
    }).map(([k, url]) =>
      cache(url).then(data =>
        fs.promises
          .writeFile(`.${sep}public${sep}${k}`, JSON.stringify(data))
          .then(() => data)
      )
    )
  );

  expect(trainingImages.length).toEqual(60000);
  expect(trainingLabels.length).toEqual(60000);
  expect(testImages.length).toEqual(10000);
  expect(testImages.length).toEqual(10000);

  for (let i = 0; i < trainingImages.length; i += 1) {
    expect(trainingImages[i].length).toEqual(28 * 28);
  }

  for (let i = 0; i < testImages.length; i += 1) {
    expect(testImages[i].length).toEqual(28 * 28);
  }

  [...Array(100)].map((_, i) => {
    console.log(toString(trainingImages[i]));
    console.log(trainingLabels[i]);
  });

  expect(true).toBeTruthy();
});
