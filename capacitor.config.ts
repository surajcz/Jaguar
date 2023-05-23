import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jaguar.app',
  appName: 'Jaguar',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: "851737854459-n55p0hr3o547hasmml0kcspe3ccvgnkm.apps.googleusercontent.com",
      iosClientId: "851737854459-n55p0hr3o547hasmml0kcspe3ccvgnkm.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },

  }
};

export default config;
