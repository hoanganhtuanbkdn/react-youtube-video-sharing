# textarea-autosize

## Props

### Special props:

| prop                | type      | description                                                                                                                                                                                                                                        |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maxRows`           | `number`  | Maximum number of rows up to which the textarea can grow                                                                                                                                                                                           |
| `minRows`           | `number`  | Minimum number of rows to show for textarea                                                                                                                                                                                                        |
| `onHeightChange`    | `func`    | Function invoked on textarea height change, with height as first argument. The second function argument is an object containing additional information that might be useful for custom behaviors. Current options include `{ rowHeight: number }`. |
| `cacheMeasurements` | `boolean` | Reuse previously computed measurements when computing height of textarea. Default: `false`                                                                                                                                                         |

Apart from these, the component accepts all props that are accepted by `<textarea/>`, like `style`, `onChange`, `value`, etc.

### How to focus

Get a ref to inner textarea:

```js
<TextareaAutosize ref={(tag) => (this.textarea = tag)} />
```

And then call a focus on that ref:

```js
this.textarea.focus();
```

To autofocus:

```js
<TextareaAutosize autoFocus />
```

(all HTML attributes are passed to inner textarea)
