import { createStore, combineReducers } from 'redux';

const story =(state={}, action)=>{
    switch(action.type){
        case "ADD_HISTORY":
        return{
            id:state.length,
            countries: action.countries,
            rundom_num: action.rundom_num
        }
    }
}

const history = (state = [], action) =>{
    switch(action.type){
        case "ADD_HISTORY":
        return[
            ...state,
            story(state,action)
        ]
        case "CLEAR_STORY":
        return [

        ]

        default:
        return state
        
    }
}

const countries = (state = [], action) =>{
    switch(action.type){
        case "ADD_COUNTRYS":
        return[
            ...action.state
        ]
        default:
        return[
            ...state
        ]
    }
}

const sort=(state="SORT_BY_DATE",action)=>{
    switch(action.type){
        case "SORT_BY_RIGHT":
        return "SORT_BY_RIGHT"
        default:
        return state
    }
}


const store = createStore(
    combineReducers({history,countries,sort}))


export default store;