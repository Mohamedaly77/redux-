const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;
const logger = reduxLogger.createLogger();

const applyMiddleware = redux.applyMiddleware;

const buy_cake = 'Buy_Cake';
const buy_iceCream = 'Buy_Ice_cream';

function buyCake() {
  return {
    type: buy_cake,
    info: 'first Redux action',
  };
}

function buyIceCream() {
  return {
    type: buy_iceCream,
    info: 'second Redux action',
  };
}

//{previous state + action}=>new state

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCake = {
  numOfCakes: 10,
};

const initialIceCream = {
  numOfIceCreams: 20,
};

// (previous state + action)=>new state

const cakeReducer = (state = initialCake, action) => {
  switch (action.type) {
    case buy_cake:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCream, action) => {
  switch (action.type) {
    case buy_iceCream:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducer({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state', store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
