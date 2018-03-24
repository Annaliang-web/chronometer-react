import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component{
  constructor(){
    super()
    this.state = {
      startTS:null,
      diff: null,
      suspended: 0,
      interval: null
    }
    // cancelAnimationFrame(this.state.interval);
    this.reset();
  }


  componentDidMount(){
    window.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e)=>{
    e.preventDefault();
    e.keyCode === 32 && this[!this.state.startTS ? 'start' : 'stop']();
    //start | stop on [space]
    e.keyCode === 27 && this.reset();
  }

  start = ()=>{
    if(this.state.startTS){
      //prevent multi clicks on start
      return;
    }
    this.setState({
      startTS: +new Date() - this.state.suspended,
      interval: requestAnimationFrame(this.tick), //display chronometer ticking
    });
  }

  pause = ()=>{
    cancelAnimationFrame(this.state.interval); //stop chrono ticking
    this.setState({
      startTS: null,
      suspended: +this.state.diff
    })
  }

  reset = ()=>{
    cancelAnimationFrame(this.state.interval);
    this.state.startTS = null,
    this.state.diff = null,
    this.state.suspend = 0,
    this.state.interval = null
  }

  tick = ()=>{
    this.setState({
      diff: new Date(+new Date() - this.state.startTS),
      interval: requestAnimationFrame(this.tick)
    })
  }

  addZero = (n)=>{
    return n < 10 ? '0' + n : n;
  }

  render(){
    const style = {
      margin: 8,
    }

    let diff = this.state.diff;
    let hundredths = diff ? Math.round(this.state.diff.getMilliseconds()/10) : 0;
    let seconds = diff ? this.state.diff.getSeconds() : 0;
    let minutes = diff ? this.state.diff.getMinutes() : 0;

    // if(hundredths === 1000){
    //   return hundredths = 0;
    // }

    return(
      <div>
        <div>
          {this.addZero(minutes)}:{this.addZero(seconds)}:{this.addZero(hundredths)}
        </div>
        <div>
          {/* <button></button>
          <button></button>
          <button></button> */}
          <div>
            <RaisedButton onClick={this.start}
              label="Start" secondary={true} style={{ width: '20%'}}/>
            <RaisedButton onClick={this.pause}
              label="Pause" secondary={true} style={style}/>
            <RaisedButton onClick={this.reset}
              label="Reset" secondary={true} style={style}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;