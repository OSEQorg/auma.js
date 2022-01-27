# Augmented Audio Framework (AUMA)

AUMA is a framework for creating augmented audio applications. The framework currently supports the following application types (optimized for mobile devices):

- [**Survey**](https://auma-demos.surge.sh/survey/). A linear set of yes/no questions with user feedback at the end based on the survey score. Example use case: A simple mental health survey.
- [**Decision Tree**](https://auma-demos.surge.sh/decision-tree/). A tree of yes/no questions with user feedback at the end based on the choices made. Example use case: A self diagnosis tool.

In general, an augmented audio application may be created by including a `<script/>` tag for the application type, and by then providing some minimal, application specific configuration. Scripts are available from the UNPKG CDN: https://unpkg.com/@oseq/auma/. This sounds a bit abstract, read on to understand more!

## Augmented audio application

You create an augmented audio application with just a simple HTML file:

```html
<!DOCTYPE html>
<html>
  <head>
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
  * Example: For the survey application type https://unpkg.com/@oseq/auma/dist/auma-survey.js. It is recommended to fix a specific version of the script in the URL e.g. for v0.0.1 of the survey use https://unpkg.com/@oseq/auma@0.0.1/dist/auma-survey.js.
* Complete `YOUR_APP_CONFIGURATION` to configure your specific application.

For script and configuration information read the application type specific documentation below.

## Survey

Script: 

https://unpkg.com/@oseq/auma/dist/auma-survey.js

Configuration:

```ts
type SurveyConfiguration = {
  id: string;
  allowSkip?: boolean;
  welcome: {
    audioUrl: string;
  };
  questions: Array<{
    id: string;
    audioUrl: string;
    imageUrl?: string;
  }>;
  // Result audio chosen based on survey score.
  // Choose audio where `from<=score<=to`.
  results: Array<{
    from: number;
    to: number;
    audioUrl: string;
    imageUrl?: string;
  }>;
  theme?: {
    logoUrl?: string;
    buttonYesBgColor?: string;
    buttonYesFgColor?: string;
    buttonNoBgColor?: string;
    buttonNoFgColor?: string;
    buttonSkipBgColor?: string;
    buttonSkipFgColor?: string;
  };
  // Optional tracking function, will be called on key events.
  trackFn?: (event: string, extraData: object) => void;
};
```

See `demo/survey/` (`npm run start-demo:survey`) for an example survey implementation.

## Decision Tree

Script: 

https://unpkg.com/@oseq/auma/dist/auma-decision-tree.js

Configuration:

```ts
type DecisionTreeConfiguration = {
  id: string;
  welcome: {
    audioUrl: string;
  };
  questions: Array<{
    id: string;
    audioUrl: string;
    imageUrl?: string;
    // onYes/onNo are string directives of the form
    // question:<questionId> or result:<resultId>
    // e.g. onYes: "question:foo" to go to question with ID foo.
    // e.g. onNo: "result:bar" to go to result with ID bar.
    onYes: string;
    onNo: string;
  }>;
  results: Array<{
    id: string;
    audioUrl: string;
    imageUrl?: string;
  }>;
  theme?: {
    logoUrl?: string;
    buttonYesBgColor?: string;
    buttonYesFgColor?: string;
    buttonNoBgColor?: string;
    buttonNoFgColor?: string;
  };
};
```

See `demo/decision-tree/` (`npm run start-demo:decision-tree`) for an example decision tree implementation.

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

Releasing:

```
# ensure no changes in workspace. `git status` => "nothing to commit, working tree clean"
npm run build
npm version patch
npm publish
git push
```

Here we created a patch version. For now this probably makes the most sense - we should stay at major version v0 unless we plan to make strong compatibility guarantees. Hence it is especially important that consumers include explicitly the specific version of the script they use.

Deploying the demo:

```
npm run deploy-demo
```

Demo is currently deployed with https://surge.sh/. Collaborators can be added using the `--add` flag https://surge.sh/help/adding-collaborators/.
