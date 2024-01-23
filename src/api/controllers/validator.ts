//https://ajv.js.org/guide/getting-started.html
//https://www.jsonschemavalidator.net/

const Ajv = require("ajv")
const ajv = new Ajv() 

const schema = {
  type: "object",
  properties: {
    id: {type: "integer"},
    org: {type: "string"},
    repo: {type: "string"},
    commit: {type: "string"}
  },
  required: ["id", "org", "repo", "commit"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

export function validSchema(monitor: string) {
  const valid = validate(monitor)
  if (!valid) {return validate.errors} else {return true}
}

