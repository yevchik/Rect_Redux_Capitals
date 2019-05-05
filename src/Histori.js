import React,{Component} from 'react';
import store from './store'

let history = [];

store.subscribe(()=>{
    history = store.getState().history
    }
)



class Histori extends Component{
    Consoler(){


        console.log("store.getState().history - ",store.getState().history);
        
        console.log("history - ",history);
        
    }
    render(){
        this.Consoler()
        if(history[0]){
            return(
                <div className="history">
                    {history.map((value,key)=>
                            <p className="historiName" key = {key}> {value.countries[value.rundom_num].name+": "} 
                                {value.countries.map((value,key)=>
                                    <Story_cauntries value={value} key={key}/>
                                )}
                            </p>
                        )}
                </div>
            )
        }else  
        return(
            <div>

            </div>
        )

    }
} 



const Story_cauntries = ({value}) =>
    <span className="countryName"  >
        {value.capital + ", "} 
    </span>



export default Histori; 