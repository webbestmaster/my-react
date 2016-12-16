import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { ping } from './enhancers/ping'
import createLogger from 'redux-logger'

export default function configureStore(initialState) {
    const logger = createLogger();

    const store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(logger, ping));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}