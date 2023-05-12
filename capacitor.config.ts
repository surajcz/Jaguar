import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jaguar.app',
  appName: 'Jaguar',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
};

export default config;
