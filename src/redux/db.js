'use strict';

import store from './store';
import PouchDB from 'pouchdb';
import { fetchPeople } from './actions';

let db = new PouchDB('app');
let remoteCouch = 'http://192.168.0.244:5984/app';
let opts = {live: true};

db.changes({
  live: true,
  include_doc: true, // eslint-disable-line camelcase
  since: 'now'
}).on('change', changeCallback)
  .on('error', console.log.bind(console));

db.replicate.to(remoteCouch, opts);
db.replicate.from(remoteCouch, opts);

function changeCallback() {
  store.dispatch(fetchPeople());

  // TODO: add/remove specific docs instead of fetching allDocs

  // if (change.deleted) {
  //   store.dispatch(deletePerson(change.id))
  // } else {
  //   store.dispatch(upsertPerson(change.doc));
  // }
}

export default db;
