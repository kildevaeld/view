module.exports = {
  // "roots": [
  //     "<rootDir>/src",
  // ],
  'transform': {'^.+\\.tsx?$': 'ts-jest', '^.+\\.jsx?$': 'babel-jest'},
  'transformIgnorePatterns': ['node_modules/'],
  'testRegex': '(/__tests__/specs/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  'moduleFileExtensions': ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // "snapshotSerializers": ["enzyme-to-json/serializer"],
  // "setupTestFrameworkScriptFile": "<rootDir>/src/__tests__/setupEnzyme.ts",
  'reporters': [
    'default',

  ]
}