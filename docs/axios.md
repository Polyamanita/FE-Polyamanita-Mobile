# 🍾 Axios Usage Example

All of Axios's functionality can be forund at `./src/api`.

## Axios instance
Axios.create is an easy way to instantiate axios and creating a consistent configuration for your API calls.

in `requests.ts`
```js
const instance = axios.create({
  baseURL: BEANSTALK_URL, // secrets found in ./secrets.ts
  timeout: 7500,
});
```

We can also get creatative by delcaring an object that handels all Fetch API call methods, GET, POST, PUT and DELETE.
```js
// Set of general Axios HTTP request functions.
const requests = {
  get: (url: string, params?: unknown) => {
    return instance
      .get(url, { params: params })
      .then(result)
      .catch(handleError);
  },
  post: (url: string, body: unknown, params?: unknown) =>
    instance
      .post(url, body, { params: params, headers: contentJSON })
      .then(result)
      .catch(handleError),
  put: (url: string, body: unknown, params?: unknown) =>
    instance
      .put(url, body, { params: params, headers: contentJSON })
      .then(result)
      .catch(handleError),
  delete: (url: string, params?: unknown) =>
    instance.delete(url, { params: params }).then(result).catch(handleError),
};
```

## API constants
List of interfaces and classes to use for API calls.

```js

// Credientials to verify a session. If valid, API returns session token.
interface Session {
  email: string;
  password: string;
}

// To authorize a userm a username, email, and pass required.
interface AuthUser extends Session {
  username: string;
}

// To confirm a user has signed up by typing 4-digit verification, we can create a new user offically.
interface NewUser extends AuthUser {
  code: string;
}

```

## API calls
List of API calls and their use. All methods created here are of `Promise<any>`.
So the developer may create a decorator to extend these methods use.

### doRegister \[POST]
@params: `AuthUser`Server side handels object to send an email verification to email.

### doAuthorize \[POST]
@params: `NewUser`
Object that confirms the code sent to users email. Upon success, this creates the account.

### doSignin \[POST]
@params: `Session`
Create a session/cookie for user sign in.

### doSignOut \[DELETE]
Delete current session and cookie.

### doGetUser \[GET]
@params: `userID: string`
Usefull when we want to get user information of any user by providing their userID.

### doUpdateColor \[POST] \<experimental>
@params: `userID: string, colors: [color1: string, color2: string]`
Updates the color for the current user.
  
### doGetCapture \[GET]
@params: `userID: string, captureID: string`
"TODO"

### doGetAllCaptures \[GET]
@params: `userID: string, captures: Captures`
"TODO"

### doGetUploadLinkAndS3Key \[POST]
@params: `userID: string`
Retreqive new upload link to post the image and its s3key.

`This is not an Axios instance!!`
### doUploadToS3 \[PUT]
Fetches image URI from the phone, converts it to a blob, then uploads blob as the body of PUT request.
