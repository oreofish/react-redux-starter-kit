import request from 'utils/request';
import {log as logValidation} from 'common/validations';

export function fetchLogsSuccess(logs) {
  return {
    type: 'FETCH_LOGS_SUCCESS',
    logs,
  };
}

export function saveLogSuccess(log) {
  return {
    type: 'SAVE_LOG_SUCCESS',
    log,
  };
}

export function updateLogSuccess(log) {
  return {
    type: 'UPDATE_LOG_SUCCESS',
    log,
  };
}

export function deleteLogSuccess(log) {
  return {
    type: 'DELETE_LOG_SUCCESS',
    log,
  };
}

export function saveLogError(errors) {
  return {
    type: 'SAVE_LOG_ERROR',
    errors,
  };
}

export function moveLog(dragIndex, hoverIndex, dragLog) {
  return {
    type: 'MOVE_LOG',
    dragIndex,
    hoverIndex,
    dragLog,
  };
}

export function fetchLogsProfileSuccess(logs) {
  return {
    type: 'FETCH_LOGS_PROFILE_SUCCESS',
    logs,
  };
}

export function clearDataLogs() {
  return {
    type: 'CLEAR_DATA_LOGS',
  };
}

export function fetchLogs(listId, sortBy = 'custom', filter = '') {
  return (dispatch) => {
    request({
      url: 'api/logs?listId=' + listId + '&sort=' + sortBy + '&filter=' + filter,
      method: 'GET',
    }).then(logs => {
      dispatch(fetchLogsSuccess(logs));
    });
  };
}

export function saveLog(newLog) {
  return (dispatch) => {
    const validationErrors = logValidation(newLog);
    if (validationErrors) return dispatch(saveLogError(validationErrors));
    request({
      url: 'api/logs',
      method: 'POST',
      body: newLog,
    }).then(log => {
      dispatch(saveLogSuccess(log));
    });
  };
}

export function updateLog(updatedLog) {
  return (dispatch, getState) => {
    const validationErrors = logValidation(updatedLog);
    if (validationErrors) return dispatch(saveLogError(validationErrors));
    const oldLog = getState().entities.logs[updatedLog.id];
    dispatch(updateLogSuccess({...updatedLog}));
    request({
      url: 'api/logs/' + updatedLog.id,
      method: 'PUT',
      body: updatedLog,
    }).then(() => {}, () => dispatch(updateLogSuccess({...oldLog})));
  };
}

export function deleteLog(log) {
  return (dispatch) => {
    request({
      url: 'api/logs/' + log.id,
      method: 'DELETE',
    }).then(() => {
      dispatch(deleteLogSuccess(log));
    });
  };
}

export function fetchLogsProfile(userId, sortBy = '-date') {
  return (dispatch) => {
    request({
      url: 'api/logs?userId=' + userId + '&sort=' + sortBy,
      method: 'GET',
    }).then(logs => {
      dispatch(fetchLogsProfileSuccess(logs));
    });
  };
}
export default function logs(state = {}, action) {
  switch (action.type) {
  /* Use the default case for fetching logs */
  case 'FETCH_LOGS_PROFILE_SUCCESS':
  /* Create hash for logs entities */
  case 'FETCH_LOGS_SUCCESS':
    const newLogs = {};
    action.logs.forEach(log => {newLogs[log.id] = log;});
    return Object.assign({}, newLogs);
  case 'SAVE_LOG_SUCCESS':
    const newLog = {};
    newLog[action.log.id] = action.log;
    return Object.assign({}, state, newLog);
  case 'UPDATE_LOG_SUCCESS':
    const updatedLog = {};
    updatedLog[action.log.id] = action.log;
    return Object.assign({}, state, updatedLog);
  case 'DELETE_LOG_SUCCESS':
    const newState = Object.assign({}, state);
    delete newState[action.log.id];
    return newState;
  /* Use the default case for clearing data */
  case 'CLEAR_DATA_LOGS':
  case 'CLEAR_DATA': return {};
  default: return state;
  }
}
