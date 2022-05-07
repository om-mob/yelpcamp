const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {timestamps: true})
/*
Schema { <----------
  obj: { email: { type: [Function: String], required: true, unique: true } },
  paths: {
    email: SchemaString {
      enumValues: [],
      regExp: null,
      path: 'email',
      instance: 'String',
      validators: [Array],
      getters: [],
      setters: [],
      _presplitPath: [Array],
      options: [SchemaStringOptions],
      _index: [Object],
      isRequired: true,
      requiredValidator: [Function (anonymous)],
      originalRequiredValue: true,
      [Symbol(mongoose#schemaType)]: true
    },
    _id: ObjectId {
      path: '_id',
      instance: 'ObjectID',
      validators: [],
      getters: [],
      setters: [Array],
      _presplitPath: [Array],
      options: [SchemaObjectIdOptions],
      _index: null,
      defaultValue: [Function],
      [Symbol(mongoose#schemaType)]: true
    }
  },
*/
/*
  aliases: {},
  subpaths: {},
  virtuals: {},
  singleNestedPaths: {},
  nested: {},
  inherits: {},
  callQueue: [],
  _indexes: [],
  methods: {}, <----------
  methodOptions: {},
  statics: {}, <----------
  tree: { <----------
    email: { type: [Function: String], required: true, unique: true },
    _id: { auto: true, type: 'ObjectId' }
  },
  query: {},
  childSchemas: [],
  plugins: [], <----------
  '$id': 1,
  mapPaths: [],
  s: { hooks: Kareem { _pres: Map(0) {}, _posts: Map(0) {} } },
  _userProvidedOptions: {},
  options: {
    typeKey: 'type',
    id: true,
    _id: true,
    validateBeforeSave: true,
    read: null,
    shardKey: null,
    discriminatorKey: '__t',
    autoIndex: null,
    minimize: true,
    optimisticConcurrency: false,
    versionKey: '__v',
    capped: false,
    bufferCommands: true,
    strictQuery: true,
    strict: true
  }
}
*/

userSchema.plugin(passportLocalMongoose)

/*
Schema {
  obj: { email: { type: [Function: String], required: true, unique: true } },
  paths: {
    email: SchemaString {
      enumValues: [],
      regExp: null,
      path: 'email',
      instance: 'String',
      validators: [Array],
      getters: [],
      setters: [],
      _presplitPath: [Array],
      options: [SchemaStringOptions],
      _index: [Object],
      isRequired: true,
      requiredValidator: [Function (anonymous)],
      originalRequiredValue: true,
      [Symbol(mongoose#schemaType)]: true
    },
    _id: ObjectId {
      path: '_id',
      instance: 'ObjectID',
      validators: [],
      getters: [],
      setters: [Array],
      _presplitPath: [Array],
      options: [SchemaObjectIdOptions],
      _index: null,
      defaultValue: [Function],
      [Symbol(mongoose#schemaType)]: true
    },
    -----------------------------------------
   | username: SchemaString {                |
   |   enumValues: [],                       |
   |   regExp: null,                         |
   |   path: 'username',                     |
   |   instance: 'String',                   |
   |   validators: [],                       |
   |   getters: [],                          |
   |   setters: [],                          |
   |   _presplitPath: [Array],               |
   |   options: [SchemaStringOptions],       |      
   |   _index: [Object],                     |
   |   [Symbol(mongoose#schemaType)]: true   |
   | },                                      |
    -----------------------------------------
    -----------------------------------------
   | hash: SchemaString {                    |
   |   enumValues: [],                       |
   |   regExp: null,                         |
   |   path: 'hash',                         |
   |   instance: 'String',                   |
   |   validators: [],                       |
   |   getters: [],                          |
   |   setters: [],                          |
   |   _presplitPath: [Array],               |
   |   options: [SchemaStringOptions],       |
   |   _index: null,                         |
   |   selected: false,                      |
   |   [Symbol(mongoose#schemaType)]: true   |
   | },                                      |
    -----------------------------------------
    -----------------------------------------
   | salt: SchemaString {                    |
   |   enumValues: [],                       |
   |   regExp: null,                         |
   |   path: 'salt',                         |
   |   instance: 'String',                   |
   |   validators: [],                       |
   |   getters: [],                          |
   |   setters: [],                          |
   |   _presplitPath: [Array],               |
   |   options: [SchemaStringOptions],       |
   |   _index: null,                         |
   |   selected: false,                      |
   |   [Symbol(mongoose#schemaType)]: true   |
   | }                                       |
    -----------------------------------------
  },
*/
/*
  aliases: {},
  subpaths: {},
  virtuals: {},
  singleNestedPaths: {},
  nested: {},
  inherits: {},
  callQueue: [],
  _indexes: [],
  ------------------------------------------
 | methods: {                                |
 |   setPassword: [Function (anonymous)],    |
 |   changePassword: [Function (anonymous)], |
 |   authenticate: [Function (anonymous)]    |
  -------------------------------------------  
  },
  methodOptions: {}, 
  ----------------------------------------------
 | statics: {                                   |                
 |   authenticate: [Function (anonymous)],      |
 |   serializeUser: [Function (anonymous)],     |
 |   deserializeUser: [Function (anonymous)],   |
 |   register: [Function (anonymous)],          |
 |   findByUsername: [Function (anonymous)],    |
 |   createStrategy: [Function (anonymous)]     |
  ----------------------------------------------
  },
  tree: {
    email: { type: [Function: String], required: true, unique: true },
    _id: { auto: true, type: 'ObjectId' },
   --------------------------------------------------------
  |  username: { type: [Function: String], unique: true }, | 
  |  hash: { type: [Function: String], select: false },    |
  |  salt: { type: [Function: String], select: false }     |
   --------------------------------------------------------
  },
  query: {},
  childSchemas: [],
  plugins: [ { fn: [Function], opts: undefined } ], <------
  '$id': 1,
  mapPaths: [],
  s: { hooks: Kareem { _pres: [Map], _posts: Map(0) {} } },
  _userProvidedOptions: {},
  options: {
    typeKey: 'type',
    id: true,
    _id: true,
    validateBeforeSave: true,
    read: null,
    shardKey: null,
    discriminatorKey: '__t',
    autoIndex: null,
    minimize: true,
    optimisticConcurrency: false,
    versionKey: '__v',
    capped: false,
    bufferCommands: true,
    strictQuery: true,
    strict: true
  }
}
*/

const User = mongoose.model('User', userSchema)

module.exports = User