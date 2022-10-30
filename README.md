# New Story

#### Utilities to generate stories for your components.

<div align="center">
  <img src="https://user-images.githubusercontent.com/52914487/198855396-20bcb252-ad73-452a-a3ee-cef06ba312ed.png" width="320" height="320" alt="new-story logo">
</div>

## Usage

```bash
# Using Yarn:
$ yarn global add new-story

# or, using NPM
$ npm i -g new-story
```

### Integrating storybook into your existing app.

```bash
# Generate boilerplate story for all components.
cd into you a directory you want your stories to be generated.

new-story stories
```

### Working on new component

```bash
# Generate Stories for all your variants
new-story story -f <filepathfromroot> -p <props>
## filepath eg: src/components/ui/Button/Button.stories.tsx
## props eg: size=sm,md,lg
```

Look into this [example](https://github.com/hussamkhatib/my-sb-app) for detailed instructions.
