import React, { Component } from 'react';
import store from './store.js'
import './App.css';
import Answers from './Answers.js';
import { unmountComponentAtNode } from 'react-dom';
import Histori from './Histori'

const API = "https://restcountries.eu/rest/v2/all";


class App extends Component {
  constructor(props, context){
    super(props, context);   
    this.state = {
        monitor:0,
        result:0,
        isLoad: false,
        answers: [],
        question: "",
        answer_lenth:4,
        rundom_num: this.RandomInteger(0,3),
        monitor_mount:10,
        animation: " "
    }
    this.grean_shine = React.createRef();
    this.RandomInteger = this.RandomInteger.bind(this);
    this.Rundom_for = this.Rundom_for.bind(this);
};

async componentDidMount() {
    fetch(API)
        .then(res => res.json())
        .then((result)=>{
            store.dispatch({
                type:"ADD_COUNTRYS",
                state: result
            })
            this.Rundom_for(store.getState().countries)
        })
    .catch((error)=>console.log(error))
}


//вертає випадкове число
RandomInteger = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

//створює масив випадкових чисел і переводить в масив країн в Rundom_item
Rundom_for(items){
      let answers = [];
        for (let i = 0; i < this.state.answer_lenth; i++) {
          answers.push(this.Rundom_item(items));
          this.setState({
              answers
          })  
      } 

      this.setState({
          isLoad:true
      })
}

Rundom_item(items){
    let i = items[this.RandomInteger(0,249)];
    if(i.capital === "" || i.capital === undefined){
        return this.Rundom_item(items);
    }else return i
}


On_chenge = (e) =>{
    this.setState({
        monitor: this.state.monitor + 1,
        rundom_num: this.RandomInteger(0,3)

    })

    this.Rundom_for(store.getState().countries);

    store.dispatch({
        type: "ADD_HISTORY",
        countries: this.state.answers,
        rundom_num: this.state.rundom_num
    })
    }


On_right = (e) => {
    this.setState({
        result: this.state.result + 1
    });
    this.On_chenge(e);
}

On_clear(){
    this.setState({
        monitor:0,
        result:0
    })

    store.dispatch({
        type: "CLEAR_STORY"
    })
}

  render() {
    const answers = this.state.answers;
    const rundom_num = this.state.rundom_num;
        if(this.state.isLoad){
            if(this.state.monitor_mount !== this.state.monitor){
         return (
            <div className="app">
                <div className="for_2h">  
                    <h2 className={this.state.animation} ref={this.grean_shine}>{this.state.monitor_mount}: всього</h2>
                    <h2 className={this.state.animation} ref={this.grean_shine}>{this.state.monitor}: пройдено</h2>
                    <h2 className={this.state.animation} ref={this.grean_shine}>{this.state.result} : правильних </h2>
                </div>
                <h1 className="app">{answers[rundom_num].name}</h1>
               {answers.map((answer,key)=>
               <Answers onClick={rundom_num === key ? this.On_right : this.On_chenge} answer = {answer}  key = {key}
                className = {"answer"}/> 
               )}
                
                <Histori/>

            </div> 
            )
        }else return (
            <div className="app">

                <h2>{this.state.result} : правильних відповіді з {this.state.monitor_mount}</h2>
                <h1 onClick={()=>this.On_clear()}>Почати спочатку</h1>
            </div>
        )
    }            
        return(
            <div>
                 Не працює інтернет або ви все зломали
            </div>
        )
          
    }
}


export default App;


