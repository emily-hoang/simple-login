####useEffect()
- Add "everything" you use in the effect function as a dependency - i.e. all state variables and functions you use in there.
A few exceptions you should be aware of:
- State updating functions
- "built-in" APIs or functions like fetch(), localStorage etc (functions and features built-into the browser and hence available globally): These browser APIs / global 
functions are not related to the React component render cycle and they also never change.
- functions that are defined OUTSIDE of your components

###useReducer()
`const [state, dispatchFn] = useReducer(reduceFn, initialState, initFn)`
- state: the state snapshot used in the component re-render/re-evaluation cycle
- dispatchFn: A function that can be used to dispatch a new action (i.e. trigger an update of state)
- reduceFn: a function that recieves the latest state snapshot and the action from the dispatchFn
--> it should return the new updated state.
- initialState: the initialState
- iniFn: a function to set the initial state  programmatically
