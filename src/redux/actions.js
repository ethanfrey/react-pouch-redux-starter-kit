'use strict';

import crypto from 'crypto';
import db from './db';

export function setGreeting(greeting) {
  return {
    type: 'SET_GREETING',
    greeting
  };
}

export function togglePeopleModal() {
  return {
    type: 'TOGGLE_PEOPLE_MODAL'
  };
}

export function pending() {
  return {
    type: 'SHOW_PENDING'
  };
}


export function fetchPeople() {
  store.dispatch(pending());
  return db.allDocs({
    include_docs: true // eslint-disable-line camelcase
  }).then(people => {
    store.dispatch(completed());
    return {
      type: 'FETCH_PEOPLE',
      payload: {
        people: mapDocsFromPouch(people)
      }
    };
  }).catch(err => {
    store.dispatch(completed());
    store.dispatch(registerError(err));
    throw err;
  });
}

export function deletePerson() {
  return {
    type: 'DELETE_PERSON'
  };
}

export function deletePeople() {
  return db.allDocs({
    include_docs: true // eslint-disable-line camelcase
  }).then(records => {
    return Promise.all(
      records.rows.map(row => row.doc)
        .map(doc => db.remove(doc))
    ).then(() => {
      return {
        type: 'DELETE_PEOPLE'
      };
    });
  }).catch(err => {
    throw err;
  });
}

export function upsertPerson(name) {
  return db.put({
    _id: generateId(),
    name: name
  }).then(() => {
    return {
      type: 'UPSERT_PERSON'
    };
  }).catch(err => {
    throw err;
  });
}

function mapDocsFromPouch(records) {
  if (!records) {
    return {};
  }

  return records.rows.map(record => record.doc);
}

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}
