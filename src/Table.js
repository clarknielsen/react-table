import React, { useState, useEffect } from "react";
import "./table.scss";

function Table(props) {
  // render nothing if not given an array
  if (!Array.isArray(props.list)) {
    return null;
  }

  // get table headers from first object in array
  const headers = [];
  
  for (let key in props.list[0]) {
    if (typeof props.list[0][key] !== "object") {
      headers.push(key);
    }
  }

  useEffect(() => {
    // make sure a default sort has been selected
    if (sortBy === undefined) {
      setSort(headers[0]);
    }
  });

  // state
  const [sortBy, setSort] = useState(headers[0]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  function handleOnChange(e) {
    setSearch(e.target.value);
    setPage(0);
  }

  function filteredList() {
    return props.list.filter((item) => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item).join("").toLowerCase();
      return values.indexOf(search.toLowerCase()) !== -1;
    });
  }

  return (
    <div className="table">
      {
        // hide search bar
        props.search === false || props.search === null ? null : 
        <input type="search" value={search} onChange={handleOnChange} />
      }      

      {
        // hide page buttons
        isNaN(props.paginate) ? null : 
        <React.Fragment>
          <button disabled={page === 0} onClick={() => setPage(page-props.paginate)}>&lt;</button>
          <button disabled={page + props.paginate >= filteredList().length} onClick={() => setPage(page+props.paginate)}>&gt;</button>
        </React.Fragment>
      }

      <div className="header">
        {
          headers.map((header, index) => {
            // convert headers into clickable labels
            return (
              <div className="col" key={index} onClick={() => setSort(header)}>
                {header}
              </div>
            );
          })
        }
      </div>
      
      {
        filteredList()
        .sort((a, b) => {
          // account for missing values
          if (a[sortBy] === undefined) {
            return 1;
          }
          else if (b[sortBy] === undefined) {
            return -1;
          }
          // sort alphabetically
          else if (isNaN(a[sortBy])) {
            return a[sortBy].localeCompare(b[sortBy]);
          }
          // numerically
          else {
            return a[sortBy] - b[sortBy];
          }
        })
        .filter((item, index) => {
          // keep all
          if (isNaN(props.paginate)) return true;

          // capture within range of pagination
          return index < page + props.paginate && index >= page;
        }).map((item, i) => {
          // convert results into table rows
          return (
            <div key={i} className="row">
              {
                headers.map((header, j) => {
                  // make sure headers align correctly with row data
                  return (
                    <div className="col" key={j} title={item[header]}>
                      {item[header]}
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default Table;