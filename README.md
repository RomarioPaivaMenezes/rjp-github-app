# rpm-git-hub-app

### Web Proxy

[https://smee.io/](https://smee.io/j3K1sEAN7dKcmpBw)

```
npx smee -u https://smee.io/j3K1sEAN7dKcmpBw -t http://localhost:3000/api/webhook
```

### Github App Guide Line
Quickly build a GitHub App that comments on pull requests.\
[Quickstart for building GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/quickstart)

[Using the REST API to interact with checks](https://docs.github.com/en/rest/guides/using-the-rest-api-to-interact-with-checks?apiVersion=2022-11-28)


### Api based
https://robkendal.co.uk/blog/build-a-restful-node-api-server-using-json-and-typescript/


package.json
```
 "_moduleAliases": {
    "@controllers": "src/api/controllers",
    "@routes": "src/api/routes",
    "@data": ".data"
  }
```

tsconfig.json

```
"baseUrl": "./",
    "paths": {
      "@controllers/*": ["src/api/controllers/*"],
      "@routes/*": ["src/api/routes/*"],
      "@data/*": [".data/*"]
    }
```

# API

## Monitor

Used to register pullRequest to be monitored.

**URL** : `/api/monitor/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "org":    "[valid email address]",
    "repo":   "[repository name]",
    "id":     "[pull request number]",
    "commit": "[commit hash id]"
}
```

**Data example**

```json
{
    "org": "org-test",
    "repo": "repo-test",
    "id": 10,
    "commit": "b6bc2f1"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Your submission has been accepted for processing."
}
```
**Condition** : If Object has been not found

**Code** : `200 OK`

**Content** :

```json
{
    "message": "The object has already been monitoring!"
}
```

## Error Response

**Condition** : If missing any required json property.

**Code** : `400 BAD REQUEST`

**Content** :

```json
    {
        "instancePath": "",
        "schemaPath": "#/required",
        "keyword": "required",
        "params": {
            "missingProperty": "org"
        },
        "message": "must have required property 'org'"
    }
```

## Monitor

Used to register pullRequest to be monitored.

**URL** : `/api/monitor/{id}`

**Method** : `GET`

**Auth required** : NO

**Data constraints** : Object id.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "org":    "[valid email address]",
    "repo":   "[repository name]",
    "id":     "[pull request number]",
    "commit": "[commit hash id]"
}
```

## Architecture

Architecture Diagram
![alt text](https://github.com/[username]/[reponame]/blob/[branch]/.data/architecture.png?raw=true)
![Architecture Diagram](\.data\architecture.png)
