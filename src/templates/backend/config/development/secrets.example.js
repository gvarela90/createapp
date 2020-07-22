module.exports = {
  db: {
    connectionUrl: 'mongodb://localhost:27017',
    name: '<%= projectName %>',
    encryption: {
      // We use a separate DB for storing the data key on tests, so that we
      // don't need to create it every time before each test.
      dbName: 'encryption',
      // dataKey was created through `NODE_ENV=development node scripts/mongo-csfle/create-data-key-for-fle.js`
      dataKey: '56fb8593-83ba-4faa-a5c6-9166187bd26f',
      keysCollection: 'dataKeys',
      localMasterKey:
        'P1XwxmeFn5wjY6GOfopXQcAH4DXPpmyW7pYoJzmVzMJwvJ2QfaDu8p3RRP3jpxKSoMGlQj/YUQ3p8z7YmTHLnb2ztCn7GibIHLuNm2faRVA6NOzMmvyhhVUtB/Dr/2Ty',
      kms: {},
    },
  },
}
