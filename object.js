module.exports = function createBroadcast (initialState) {
  let listeners = {}
  let id = 0
  let _state = initialState

  const getState = () => _state

  const setState = state => {
    _state = state
    const keys = Object.keys(listeners)
    for (let i = 0; i < keys.length; i += 1) {
      // if a listener gets unsubscribed during setState we just skip it
      if (typeof listeners[keys[i]] !== 'undefined') {
        listeners[keys[i]](state)
      }
    }
  }

  const subscribe = listener => {
    if (typeof listener !== 'function') { throw new Error('listener must be a function.') }
    const currentId = id
    listeners[currentId] = listener
    id += 1
    return currentId
  }
  const unsubscribe = id => {
    delete listeners[id]
  }
 

  return { getState, setState, subscribe, unsubscribe }
}
