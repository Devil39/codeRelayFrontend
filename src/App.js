import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Recaptcha from 'react-recaptcha';

import './App.css';
// import a from './assets/bootstrap/js/bootstrap.min.js';

// import bg from './assets/img/BG.svg';
import CodeRelay from './assets/img/CodeRelayLogo.svg';
// import hackerrankLogo from './assets/img/HackerRankLogo.svg';
import hackerrankLogo from './assets/img/HackerRanklogo.svg';
import facebookLogo from './assets/img/facebook.png';
import instaLogo from './assets/img/Instagram.png';
import twitterLogo from './assets/img/Twitter.png';
import ieeeLogo from './assets/img/IEEE.png';

require('dotenv').config();

let recaptchaInstance;

const executeCaptcha = function () {
  recaptchaInstance.execute();
};

class App extends React.Component{

  constructor(){
    super();
    this.count = this.count.bind(this)
    this.state={
      name: "",
      email: "",
      regNo: "",
      phoneNo: "",
      userID: "",
      isVerified: false,
      days: 0,
      minutes: 0,
      hours: 0,
      seconds: 0,
      time_up:""
    }
    this.x = null
    this.deadline = null
  }

  componentDidMount(){
      setTimeout(function(){
          // console.log("executeCaptcha");
          executeCaptcha();
          // console.log("executeCaptchaDone");
      }, 1000);
      this.deadline = new Date("mar 20, 2020 20:20:00").getTime();
      this.x = setInterval(this.count, 1000);
  }

  verifyCallback=(token)=>{
    if (token) {
        this.setState({isVerified: true}, () => {
            console.log("Verified recaptcha!");
        });
    }
    else {
        this.setState({isVerified: false});
        console.log("failed to verify recaptcha!");
    }
}

  showBottomBorder=()=>{
    // document.getElementsByClassName("form-row-input").style.borderBottom="1px solid black";
  }

  onNameChange=(event)=>{
    // console.log(event.targ);
    this.setState({
      name: event.target.value
    });
  }

  onEmailChange=(event)=>{
    // console.log(event.targ);
    this.setState({
      email: event.target.value
    });
  }

  onRegNoChange=(event)=>{
    // console.log(event.targ);
    this.setState({
      regNo: event.target.value
    });
  }

  onPhoneNoChange=(event)=>{
    // console.log(event.targ);
    this.setState({
      phoneNo: event.target.value
    });
  }

  onUserIDChange=(event)=>{
    // console.log(event.targ);
    this.setState({
      userID: event.target.value
    });
  }

  count () {        
      var now = new Date().getTime();
      var t = this.deadline - now;
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((t % (1000 * 60)) / 1000);
      // console.log(now);
      // console.log(t);
      // console.log(days);
      // console.log(hours);
      // console.log(minutes);
      // console.log(hours);
      this.setState({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
      if (t < 0) {
              clearInterval(this.x);
              this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0, time_up: "TIME IS UP" })
          }
  }

  preprocess=()=>{
    // console.log(this.state);
    return new Promise((resolve, reject)=>{
      this.setState({
        name: this.state.name.trim(),
        email: this.state.email.trim(),
        phoneNo: this.state.phoneNo.trim(),
        regNo: this.state.regNo.trim(),
        userID: this.state.userID.trim()
      });
      resolve();
      // console.log("Spmetong");
    });
  }

  submitHandle= async ()=>{
    // console.log("Something");
    await this.preprocess();
    // console.log(this.state);
    // fetch(`${process.env.REACT_APP_API_URL}/api/user/reg`,{
      fetch(`${process.env.react_app_api_url}/api/user/reg`,{
        method: "post",
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            regNo: this.state.regNo,
            contactNo: this.state.phoneNo,
            hackerrankid: this.state.userID,
        })
    }).then((data)=>{
        // return data.json();
        if(data.status===200)
         {
          return data.json();
         }
        else{
          throw data.status;
        }
    }).then((data)=>{
      // if(data)
      //  {

      //  }
      console.log(JSON.stringify(data));
      alert(JSON.stringify(data["msg"]));
    }).catch((err)=>{
      alert(JSON.stringify(err));
      console.log("Error!......"+err);
    });
  }

  recaptchaVerify=()=>{
    console.log(this.state.isVerified);
      if(this.state.isVerified){
          this.submitHandle();
      }
      else{
          alert("Failed to verify reCapcha! Check your connectivity or refresh the page!");
      }
  }

  render(){
    // console.log(process.env.REACT_APP_RECAPTCHA_KEY);
    return (
      <div>
        <div className="bg-container">
          <div className="logo-container">
            <img src={CodeRelay} alt="" className="code-relay-logo"/>
          </div>
          <div className="content-below-logo">
            <p className="content-below-logo__line1">A competition coding contest organized by IEEE VIT.</p>
    <p className="content-below-logo__line2">The marathon begins in {this.state.days} days {this.state.hours} hours {this.state.minutes} minutes {this.state.seconds} seconds</p>
          </div>
          {/* <div className="one">
            <img src="assets/img/CodeRelay%20logo.svg" style={{"margin":"24px auto"}} alt=""/>
            <h1 >A competitive coding contest organised by IEEE VIT<br />will be live from 20th to 22nd March.</h1>
          </div> */}
          {/* <div className="two">
            <p className="para">In collaboration with</p><img src="assets/img/HackerRank%20icon.svg" /></div> */}
          {/* <script src="assets/bootstrap/js/bootstrap.min.js"></script> */}
        </div>
        <div>
          <div className="hackerrank-container">
            <span className="hackerrank-logo-before">in collaboration with</span>
            <img src={hackerrankLogo} alt="" className="hackerrank-logo"/>
          </div>
          <div className="form-container">
            <div className="form-card">
              <div className="form-heading"><p>Register Now!</p></div>
              <div className="card-body">
                <div className="form-row">
                  <label className="label">Name</label>
                  <input type="name" className="form-row-input" placeholder="Enter your name" onClick={this.showBottomBorder} onChange={this.onNameChange}/>
                </div>
                <div className="form-row">
                  <label className="label">VIT email address</label>
                  <input pattern="[a-zA-z0-9.]+@vitstudent.ac.in" type="email" className="form-row-input" placeholder="email@vitstudent.ac.in" onClick={this.showBottomBorder} onChange={this.onEmailChange}/>
                </div>
                <div className="form-row">
                  <label className="label">Registration Number</label>
                  <input pattern="[0-9]{2}[A-Za-z]{3}[0-9]{4}" type="text" className="form-row-input" placeholder="19BCE001" onClick={this.showBottomBorder} onChange={this.onRegNoChange}/>
                </div>
                <div className="form-row">
                  <label className="label">Contact Number</label>
                  <input pattern="[1-9]{1}[0-9]{9}" type="text" className="form-row-input" placeholder="9658741230" onClick={this.showBottomBorder} onChange={this.onPhoneNoChange}/>
                </div>
                <div className="form-row">
                  <label className="label">Hackerrank user ID</label>
                  <input type="text" className="form-row-input" placeholder="Enter your user ID of Hackerrank" onClick={this.showBottomBorder} onChange={this.onUserIDChange}/>
                </div>
              </div>
              <div className="submit-button-container">
                {/* <button className="submit-button" type="submit" onSubmit={this.submitHandle}>Submit</button> */}
                <button className="submit-button" type="submit" onClick={this.recaptchaVerify}>Submit</button>
              </div>
            </div>
          </div>
          <div className="logos-container">
            <div className="social-media-handles">
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/IEEEVIT"><img src={facebookLogo} alt="" className="handle-logo"/></a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ieeevitvellore"><img src={instaLogo} alt="" className="handle-logo"/></a>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ieeevitvellore"><img src={twitterLogo} alt="" className="handle-logo"/></a>
            </div>
            <div className="ieee-logo">
            <a target="_blank" rel="noopener noreferrer" href="https://ieeevit.org"><img src={ieeeLogo} alt=""/></a>
            </div>
          </div>
        </div>
        <div className="recaptcha">
                <Recaptcha
                ref={e => recaptchaInstance = e}
                sitekey={process.env.react_app_recaptcha_key}
                // sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                size="invisible"
                theme="light"
                verifyCallback={this.verifyCallback}
                onloadCallback={(res)=>{
                    console.log(res);
                    console.log("Loaded captcha");
                }}
            />
            </div>
      </div>
    );
  }
}

export default App;
