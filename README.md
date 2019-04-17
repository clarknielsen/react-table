# React Table

Reusable table component using React Hooks and SASS. Overall project was spun up with Create-React-App, but all you really need is `/src/components/Table`.

At the very least, you must provide a `list` prop which is an array of objects. Table component will use the properties of the first object in the array to make the table header. Other props are optional to show pagination buttons and search bar.

```js
  <Table
    list={[...data]} // required data set
    paginate={5} // number of records per page; omit to show all
    search={null} // set to null or false to remove search box
  />
```