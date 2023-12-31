import { useState, useEffect } from "react";

export default function ResultRecommendationTable({ data }) {
  const [listTable, setListTable] = useState([]);

  useEffect(() => {
    if (data) {
      generateData();
    }
  }, [data]);

  const generateData = () => {
    let tabletemp = [];
    data.forEach((element, index) => {
      let datatemp = {};
      datatemp["id"] = index + 1;
      datatemp["productId"] = element;
      datatemp["productName"] = `Product ${element}`;
      datatemp["note"] = "";
      tabletemp.push(datatemp);
    });
    setListTable(tabletemp);
  };

  return (
    <div className="m-3">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Note</th>
          </tr>
        </thead>
        <tbody>
          {listTable.map((item) => {
            return (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
