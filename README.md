# React Table

Reusable React table component using React Hooks and SASS.

At the very least, you must provide a `list` prop which is an array of objects. Other props are optional to show pagination buttons and search bar.

```js
  <Table
    list={[...data]}
    paginate={5}
    search={null}
  />
```