import React, { Fragment, useState } from "react";
import "./App.css";
import axios from "axios";

import {
  CRow,
  CForm,
  CFormLabel,
  CCol,
  CFormInput,
  CButton,
} from "@coreui/react";

import "bootstrap/dist/css/bootstrap.min.css";
import ResultRecommendationTable from "./ResultTable";

function App() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://skilvultest.applinations.com"
      : "http://localhost:5000";

  const [customerId, setCustomerId] = useState(1);
  const [num, setNum] = useState(5);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await axios
        .get(`${apiUrl}/api/recommender?customer_id=${customerId}&n=${num}`)
        .then((response) => {
          console.log(response);
          setListData(response.data.result.listproductids);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  const handleCustomerId = (event) => {
    let value = parseInt(event.target.value);
    if (value) {
      setCustomerId(value);
    }
  };

  const handleNum = (event) => {
    let value = parseInt(event.target.value);
    if (value) {
      setNum(value);
    }
  };

  return (
    <div className="container">
      <Fragment>
        <div className="mt-3 mb-5">
          <h1 className="text-center">Terra Store</h1>
        </div>
        <div>
          <p>
            Hi, Guys <br /> Please input the customer ID that you want for
            getting the recommendations for the customer.
            <br />
            Then, please input the Top N number to get the top N
            recommendations. <br />
            Good Luck, Marketing Team :)
          </p>
        </div>
        <div className="m-5">
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputCustomerId"
                className="col-sm-4 col-form-label"
              >
                Customer ID
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput
                  type="number"
                  id="inputCustomerId"
                  min="1"
                  defaultValue={1}
                  onChange={handleCustomerId}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputNum"
                className="col-sm-4 col-form-label"
              >
                Top N List recommendations
              </CFormLabel>
              <CCol sm={4}>
                <CFormInput
                  type="number"
                  id="inputNum"
                  min="3"
                  defaultValue={5}
                  onChange={handleNum}
                />
              </CCol>
            </CRow>

            <CButton type="submit" disabled={loading}>
              {loading ? "LOADING..." : "Getting Recommendations"}
            </CButton>
          </CForm>

          {error && <span>{error.toString()}</span>}

          {listData && <ResultRecommendationTable data={listData} />}
        </div>

        <footer className="mb-3">Created with ❤️ by Muh. Rizky Hatsa</footer>
      </Fragment>
    </div>
  );
}

export default App;
