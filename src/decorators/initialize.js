import {Collection} from '../collection'

function errMsg (name) {
  return `${name}: Schemas are not inheritable, did you forget to define a schema?`
}

export function initialize (opts) {
  opts || (opts = {})
  return function (target) {
    const collection = new Collection([], target.idAttribute)
    target.data = function () {
      // TODO: Do I need this?
      if (this.data === Object.getPrototypeOf(this).data) { // eslint-disable-line
        throw new Error(errMsg(this.name))
      }
      return collection
    }
  }
}
