import './App.css';
import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer tTU3gFVUdP');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    fetch("https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ 'email': 'mayankmittal@intugine.com' }),
    })
      .catch((err) => {
        console.log("Fail zone", err);
      })
      .then((res) => {
        if (res) {
          res.json().then((json) => {
            this.setState({ data: json }, () => console.log(this.state));
          });
        } else {
          console.log("error", res);
        }
      });
  }


  render() {
    return (

      <div className="App">
        <button>HOME</button>
        <table className="table">
          <thead>
            <tr>
              <th>AWB NUMBER </th>
              <th>TRANSPORTER</th>
              <th>SOURCE</th>
              <th>DESTINATION</th>
              <th>BRAND</th>
              <th>START DATE</th>
              <th>ETD</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((d, i) => {
              return <tr key={i}>
                <td>#{d.awbno}</td>
                <td>{d.carrier}</td>
                <td>{d.from}</td>
                <td>{d.to}</td>
                <td>USPA</td>
                <td>{d.pickup_date}</td>
                <td>{d.time}</td>
                <td>{d.current_status}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>
    )
  }
}

export default App

