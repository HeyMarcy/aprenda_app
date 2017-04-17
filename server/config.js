exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://am:pass@ds161049.mlab.com:61049/blog-seed';
// exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
//                        global.TEST_DATABASE_URL ||
//                       'mongodb://am:pass@ds161029.mlab.com:61029/blog-test-db'

exports.PORT = process.env.PORT || 8080;


//   mongodb://user:language@ds161960.mlab.com:61960/word-library
