# DeepRoxx

DeepRoxx is an interactive neural network playground. Adjust datasets, features, and network layers, then watch the model learn through live visualizations of its network and decision boundary.

[Open the live playground](https://roxxadiiii.github.io/deeproxx/) · [View the source](https://github.com/roxxadiiii/deeproxx)

## Features

- Explore 19 classification datasets and 19 regression datasets.
- Configure model features, layers, activations, and training settings.
- Visualize network weights, decision boundaries, and training loss as learning progresses.
- Share configurations through the URL.

## Run locally

Requires Node.js and npm.

```bash
npm ci
npm run dev
```

The development server is available at `http://localhost:8080`.

## Checks and build

```bash
npm test
npm run type-check
npm run build
```

The production site is written to `dist/`.

## Documentation

- [Machine learning primer](docs/primer.md)
- [Classroom labs](docs/labs/)
- [FAQ](docs/faq.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Glossary](docs/glossary.md)
- [Custom dataset guide](docs/custom-dataset.md)
- [API reference](docs/api.md)
- [Architecture](ARCHITECTURE.md)
- [Contributing](CONTRIBUTING.md)

## Deployment

GitHub Pages deploys `dist/` through [the Actions workflow](.github/workflows/deploy.yml) when changes are pushed to `main`. The Pages source must be set to **GitHub Actions**.

For Netlify, use `npm run build` as the build command and `dist` as the publish directory.

## Credits

- ASCII shark background engine: [ascii-sharks](https://github.com/stackedlol/ascii-sharks), used under the MIT License.
- Neural network playground inspiration: [TensorFlow Playground](https://playground.tensorflow.org/).

## License

[Apache License 2.0](LICENSE)
