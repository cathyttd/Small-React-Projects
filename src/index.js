import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Stage extends React.Component{
  render(){
    console.log(this.props.currentClass)
    return(
      <div className = {this.props.currentClass} onClick={()=>this.props.onClick()}>
        {this.props.value}
      </div>)
  }
}

class Arrow extends React.Component{
  render(){
    return(
      <button 
        className="arrow" 
        onClick={()=>this.props.onClick()}
      >
        {this.props.value}
      </button>
      )
  }
}

class Bar extends React.Component{
  backArrow(i,type){
    return(
      <Arrow 
        value = {type}
        onClick={()=>this.props.onClick(i,"back")}
      />
      )
  }

  nextArrow(i,type){
    return(
      <Arrow 
        value = {type}
        onClick={()=>this.props.onClick(i,"next")}
      />
      )
  }

  stage(i,type,currentClass){
    return(
      <Stage
        value = {type}
        currentClass = {currentClass}
        onClick={()=>this.props.onClick(i,"stage")}
      />
      )
  }

  setStages(n){
    let stages = [];
    for (let i = 0; i<n;i++){
      console.log("Adding stage");
      let currentClass;
      console.log("current in setting stage", this.props.current)
      if(i === this.props.current){
        currentClass = "current"
      }else if (this.props.stages[i]){
        currentClass = "highlightedStage"
      }else{
        currentClass = "stage"
      }
      stages.push(
        <div 
          className = {currentClass} 
          key = {i
        }>
        {this.stage(i,"Stage "+(i+1),currentClass)}
        </div>
        )
    }
    return stages
  }

  render(){

    const stages = this.setStages(this.props.nStages)
    return(
      <div className="bar">
          {this.backArrow(undefined,"Back")}
          {stages}
          {this.nextArrow(undefined,"Next")}
      </div>
    )
  }
}

class Display extends React.Component{

  render(){
    return(
      <button className = "display" onClick={()=>this.props.onClick()}>
      </button>)
    
  }
}

class System extends React.Component{

  constructor(props) { 
    super();
    let initialStage = Array(props.nStages).fill(false);
    initialStage[0] = true;
    console.log(initialStage)
    this.state = {
      stages: initialStage,
      current: 0,
    };
  }


  handleClick(i,type){
    let stages = this.state.stages.slice()
    console.log(type)

    if (type === "back"){
      if (i === 0 ){
        return;
      }else{
        if (this.state.current > 0 &&
          this.state.stages[this.state.current-1]
          ){
          this.setState({
          current: --this.state.current
          })
        }
      }

    }else if (type === "next"){
        console.log("next stage",this.state.current+1)
        console.log("value of next stage",this.state.stages[this.state.current+1])
        if (this.state.current < this.state.stages.length && 
          this.state.stages[this.state.current+1]){
          console.log("next stage change")
          this.setState({
          current: ++this.state.current
        })
      }

    }else if(type ==="display"){
      if (this.state.current+1 < this.state.stages.length && 
        !this.state.stages[this.state.current+1]){
        stages[this.state.current+1] = true
        this.setState(
          {
          stages: stages,
          current: ++this.state.current
          })
      }

    }else{
      console.log("i in stages",i);
      console.log("stages length", stages.length)
      if (i < stages.length && stages[i]){
        console.log("inside valid stages")
        this.setState({
          stages: stages,
          current: i
        });
      console.log("current within",this.state.current)
      }
    }
    console.log("stages",stages);
    console.log("current",this.state.current)
    console.log("--------------------------")
  }


  render(){

    return(
      <div className = "board">
        <div className="game">
          <div className="game-board">
            <Bar
              onClick={(i,type) => this.handleClick(i, type)}
              nStages={this.props.nStages}
              stages = {this.state.stages}
              current = {this.state.current}
            />
            <Display
              onClick={(i,type) => this.handleClick(i, "display")}
            />
          </div>
          <div className="game-info">
          </div>
        </div>
      </div>
    );
  }
}



ReactDOM.render(
  <System nStages = {7}/>,
  document.getElementById('root')
);

