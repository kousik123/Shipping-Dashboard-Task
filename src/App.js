import './App.css';
import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = { data: [], untouchedData: [], select: null };
  }


  componentDidMount() {
    this.getData();
  }

  goFilter(type) {
    let filterd = this.state.untouchedData.filter(data => {
      return data.current_status_code === type;
    });
    return filterd;
  }

  filter(type) {
    let filterd = this.goFilter(type);
    this.setState({ data: filterd, select: type });
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
            this.setState({ data: json, untouchedData: json }, () => console.log(this.state));
          });
        } else {
          console.log("error", res);
        }
      });
  }

  getLength(type) {
    let filterd = this.goFilter(type);
    return filterd.length;
  }


  render() {
    return (
      <div className="App">

        <div className="container-fluid">
          {
            this.state.untouchedData.length > 0 && (<div className="row justify-content-center">
              
              <div  style={{backgroundColor:"ButtonShadow"}} className={`col-sm-2 filter ${this.state.select === 'DEL' ? 'active' : ''}`} onClick={() => this.filter('DEL')}>
                <p>DEL</p>
                <h2>{this.getLength('DEL')}</h2>
              </div>

              <div style={{backgroundColor:"darkgray"}} className={`col-sm-2 ${this.state.select === 'INT' ? 'active' : ''}`} onClick={() => this.filter('INT')}>
                <p>INT</p>
                <h2>{this.getLength('INT')}</h2>
              </div>
              <div style={{backgroundColor:"ButtonShadow"}} className={`col-sm-2 filter ${this.state.select === 'OOD' ? 'active' : ''}`} onClick={() => this.filter('OOD')}>
                <p>OOD</p>
                <h2>{this.getLength('OOD')}</h2>
              </div>
              <div style={{backgroundColor:"darkgray"}}  className={`col-sm-2 filter ${this.state.select === 'DEX' ? 'active' : ''}`} onClick={() => this.filter('DEX')}>
                <p>DEX</p>
                <h2>{this.getLength('DEX')}</h2>
              </div>
              <div style={{backgroundColor:"ButtonShadow"}} className={`col-sm-2 filter ${this.state.select === 'NFI' ? 'active' : ''}`} onClick={() => this.filter('NFI')}>
                <p>NFI</p>
                <h2>{this.getLength('NFI')}</h2>
              </div>
            </div>)
          }

          <div className="row">
            <div className="col-md-12">

              <div className="table-holder">
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

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

