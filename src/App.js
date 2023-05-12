import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input 
      type="button"
      value="remove func"
      onClick={function() {
        setFuncShow(false);
      }}></input>
      <input 
      type="button"
      value="remove comp"
      onClick={function() {
        setClassShow(false);
      }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}
var funcStyle = 'color:blue';
var funcId = 0;

function FuncComp(props) {
  var numberState= useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];

  var[_date, setDate] = useState((new Date()).toString());
  useEffect(function() {
    console.log('%cfunc => useEffect (componentDidMount)'+(++funcId), funcStyle);
    document.title = number;
    return function() {
      console.log('%cfunc => useEffect return(componentDidMount)'+(++funcId), funcStyle);
    }
  }, []);

  useEffect(function() {
    console.log('%cfunc => useEffect_number(componentDidMount & componentDidUpdate)'+(++funcId), funcStyle);
    document.title = number;
    return function() {
      console.log('%cfunc => useEffect_number return(componentDidMount & componentDidUpdate)'+(++funcId), funcStyle);
    }
  }, [number]);

  useEffect(function() {
    console.log('%cfunc => useEffect_date(componentDidMount & componentDidUpdate)'+(++funcId), funcStyle);
    document.title = _date;
    return function() {
      console.log('%cfunc => useEffect_date return(componentDidMount & componentDidUpdate)'+(++funcId), funcStyle);
    }
  }, [_date]);

  console.log('%cfunc => render'+(++funcId), funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input 
      type="button" 
      value="random" 
      onClick={function(){
      setNumber(Math.random());
      }
    }></input>
      <input 
      type="button" 
      value="date" 
      onClick={ function() {setDate((new Date()).toString());
      }
    }></input>
    </div>
  );
}

class ClassComp extends React.Component{
  state = {
    number: this.props.initNumber,
    date:(new Date()).toString()
  }
  render() {
    return (
      <div className="container">
      <h2>Class style component</h2>
      <p>Number : {this.state.number}</p>
      <p>Date : {this.state.date}</p>
      <input 
      type="button" 
      value="random" 
      onClick={function() {
        this.setState({number:Math.random()})
      }.bind(this)
    }></input>
      <input 
      type="button" 
      value="date" 
      onClick={ function() {
        this.setState({date:(new Date()).toString()})}.bind(this)
    }></input>
    </div>
    )
  }
}

export default App;
