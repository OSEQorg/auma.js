# Augmented Audio Framework (AUMA)

AUMA is a framework for creating augmented audio applications. The framework currently supports the following application types:

- **Survey**. A set of yes/no questions with user feedback at the end based on the survey score.

In general, an augmented audio application may be created by including a `<script/>` tag for the application type, and by then providing some minimal, application specific configuration. Scripts are available from the UNPKG CDN: https://unpkg.com/@oseq/auma/. This sounds a bit abstract, so check out the examples for the concrete application types below.

## Survey

A survey may be created like so:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Include the AUMA script for this application type -->
    <!-- Fix version by specifying a version in the URL, else will use latest -->
    <!-- e.g. for v1.2.3 use https://unpkg.com/@oseq/auma@1.2.3/dist/auma-survey.js  -->
    <script src="https://unpkg.com/@oseq/auma/dist/auma-survey.js"></script>
  </head>
  <body>
    <!-- Configure & start the application -->
    <script>
      // Create your configuration
      const appConfiguration = {
        // ...
      };
      // Start the application
      auma(appConfiguration);
    </script>
  </body>
</html>
```

The app configuration object:

```ts
type SurveyAppConfiguration = {
  id: string;
  welcome: {
    audioUrl: string;
  };
  questions: Array<{
    id: string;
    audioUrl: string;
  }>;
  // Result audio chosen based on survey score.
  // Choose audio where `from<=score<=to`.
  results: Array<{
    from: number;
    to: number;
    audioUrl: string;
  }>;
  // Optional tracking function, will be called on key events.
  trackFn?: (event: string, extraData: object) => void;
};

```

See `demo/survey` (`npm run start-demo:survey`) for an example survey implementation.

## Development

Requirements:

- NodeJS https://nodejs.org/en/
- Basic understanding of VueJS development https://v3.vuejs.org/

```
# install the development dependencies
npm install

# run a demo e.g. survey
npm run start-demo:survey

# see package.json "scripts" section for more.
```

### Releasing

e.g. a patch

```
npm run build
npm version patch
npm publish
```
