# Augmented Audio Framework (AUMA)

AUMA is a framework for creating augmented audio applications. The framework currently supports the following application types:

- **Survey**. A set of yes/no questions with user feedback at the end based on the survey score.

In general, an augmented audio application may be created by including a `<script/>` tag for the application type, and by then providing some minimal, application specific configuration. Scripts are available from the UNPKG CDN: https://unpkg.com/@oseq/auma/. This sounds a bit abstract, read on to understand more!

## Augmented audio application

You create an augmented audio application with just a simple HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Include the AUMA script for this application type -->
    <script src="SCRIPT"></script>
  </head>
  <body>
    <!-- Configure & start the application -->
    <script>
      const appConfiguration = {
        // YOUR_APP_CONFIGURATION
      };
      auma(appConfiguration);
    </script>
  </body>
</html>
```

You only need to make a few small adaptions:

* Replace `SCRIPT` with a link to the AUMA script for your application type. 
  * Example: For the survey application type https://unpkg.com/@oseq/auma/dist/auma-survey.js. You can fix a specific version of the script in the URL if you like e.g. for v1.2.3 of the survey application type script use https://unpkg.com/@oseq/auma@1.2.3/dist/auma-survey.js.
* Complete `YOUR_APP_CONFIGURATION` to configure your specific application.

For script and configuration information read the application type specific documentation below.

## Survey

Script: 

https://unpkg.com/@oseq/auma/dist/auma-survey.js

Configuration:

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

See `demo/survey/` (`npm run start-demo:survey`) for an example survey implementation.

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

Releasing e.g. a patch

```
npm run build
npm version patch
npm publish
```
