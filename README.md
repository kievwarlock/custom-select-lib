# custom-select
JavaScript library for custom HTML `<select>`.
No dependencies needed.

## Install

In HTML with the `script` tag:
```html
<script src="custom-select.js" type="text/javascript"></script>
```
and:
```html
<link rel="stylesheet" href="custom-select.css">
```

## How it works
Start with a simple HTML `<select>`:
```html
<select class="my-select-element">
  <option value="1">Test 1</option>
  <option value="2">Test 2</option>
  <option value="3">Test 3</option>
</select>
```
```js
const customSelect = new CustomSelect('.my-select-element');
```

The additional settings  is:
```js
{
    containerClass: '',
    selectValueClass: '',
    headClass: '',
    optionsClass: '',
}
```

## Methods  
 
### getValue() `method`
get selected value
```js
const customSelect = new CustomSelect('.custom-select-element');
const selectedValue = customSelect.getValue();
```

### setValue() `method`
set value
```js
const customSelect = new CustomSelect('.custom-select-element');
const selectedValue = customSelect.setValue('1');
```

## Events

### onChange

```js
const customSelect = new CustomSelect('.custom-select-element');
customSelect.onChange( (data) => {
    console.log('onChange', data);
})
```
