export class PackageJsonNotFoundException extends Error {
  override name = 'PackageJsonNotFoundException'

  constructor() {
    super(
      'Cannot find package.json in the root. ' + 'Please specify root directory manually using "configure" parameters'
    )
  }
}

export class JsconfigNotFoundException extends Error {
  override name = 'JsconfigNotFoundException'

  constructor() {
    super(
      'Cannot find jsconfig.json in the root. ' +
        'Please specify root directory manually using "configure" parameters, ' +
        'or use "jsconfig" option in "alias" preset'
    )
  }
}
