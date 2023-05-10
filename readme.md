=> Google Login implementation: ---------------------

- install google+ plugin:
  npm i @ionic-native/google-plus
  npm install cordova-plugin-googleplus
  ionic cap sync

- Add the required code:
  googleLogin() {
  this.googlePlus.login({}).then(async (res: any) => {
  console.log(res);
  this.name = res.displayName;
  this.email = res.email;
  this.image = res.imageUrl;
  }).catch((err: any) => {
  console.error(err)
  });
  }

- Go to Google Developer Console (console.cloud.google) > Login
- Side Menu > API & Services > Credentials > New Project
- Side Menu > Enabled APIs > (+)Add API > Browse through the products > Google+ > Enable it
- Side Menu > Credentials > (+)OAuth Client ID > Config consent screen > Internal > Create(Fill in the details)
- Side Menu > Credentials > (+)Create Credentials > OAuth Client ID(Fill in the App type | name | package name-from capacitor.config.ts)
- To generate SHA1 key for debugging, run:
  keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
- Copy the SHA1 key generated and put it in the required field.
  (- Download the JSON file) Not required if just fetching user data on login.
- Make build and test on device.
