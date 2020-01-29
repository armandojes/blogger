import makeFlux from 'helpers/make_flux'
import request from 'helpers/requests'
import { saveSession } from 'helpers/session_persist'

const flux = makeFlux('aplication')

const setLoading = flux.createAction('SET_LOADING', (state, payload) => {
  return {
    ...state,
    loading: payload
  }
})

const setLogged = flux.createAction('SET_LOGGED', (state, payload) => {
  return {
    ...state,
    ...payload
  }
})

export const startLogin = data => async dispatch => {
  dispatch(setLoading(true))
  const response = await request.user.login(data)
  if (!response.error) {
    const session = {
      loading: false,
      logged: true,
      username: response.username,
      fullname: response.fullname,
      token: response.token,
      id: response.id
    }
    dispatch(setLogged(session))
    saveSession(session)
  }
  dispatch(setLoading(false))
}

export default flux.createReducer({
  loading: false,
  logged: false,
  username: null,
  fullname: null,
  token: null,
  id: null
})
