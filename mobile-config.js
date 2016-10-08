/* global App */
App.info({
  id: 'classk.com',
  name: 'Classk',
  description: 'The classroom Q&A',
  author: 'Enrique Piqueras',
  email: 'epiquerass@gmail.com',
  website: 'https://www.classk.com',
});
App.icons({
  iphone_2x: 'icons/Icon-App-60x60@2x.png', // (120x120)
  iphone_3x: 'icons/Icon-App-60x60@3x.png', // (180x180)
  ipad: 'icons/Icon-App-76x76@1x.png', // (76x76)
  ipad_2x: 'icons/Icon-App-76x76@2x.png', // (152x152)
  ipad_pro: 'icons/Icon-App-83.5x83.5@2x.png', // (167x167)
  ios_settings: 'icons/Icon-App-29x29@1x.png', // (29x29)
  ios_settings_2x: 'icons/Icon-App-29x29@2x.png', // (58x58)
  ios_settings_3x: 'icons/Icon-App-29x29@3x.png', // (87x87)
  ios_spotlight: 'icons/Icon-App-40x40@1x.png', // (40x40)
  ios_spotlight_2x: 'icons/Icon-App-40x40@2x.png', // (80x80)
  android_mdpi: 'icons/ic_launchermdpi.png', // (48x48)
  android_hdpi: 'icons/ic_launcherhdpi.png', // (72x72)
  android_xhdpi: 'icons/ic_launcherxhdpi.png', // (96x96)
  android_xxhdpi: 'icons/ic_launcherxxhdpi.png', // (144x144)
  android_xxxhdpi: 'icons/ic_launcherxxxhdpi.png', // (192x192)
});
App.launchScreens({
  iphone_2x: 'splashscreens/screen-iphone-portrait-2x.png', // (640x960)
  iphone5: 'splashscreens/screen-iphone-portrait-568h-2x.png', // (640x1136)
  iphone6: 'splashscreens/screen-iphone-portrait-667h.png', // (750x1334)
  iphone6p_portrait: 'splashscreens/screen-iphone-portrait-736h.png', // (1242x2208)
  iphone6p_landscape: 'splashscreens/screen-iphone-landscape-736h.png', // (2208x1242)
  ipad_portrait: 'splashscreens/screen-ipad-portrait.png', // (768x1024)
  ipad_portrait_2x: 'splashscreens/screen-ipad-portrait-2x.png', // (1536x2048)
  ipad_landscape: 'splashscreens/screen-ipad-landscape.png', // (1024x768)
  ipad_landscape_2x: 'splashscreens/screen-ipad-landscape-2x.png', // (2048x1536)
  android_mdpi_portrait: 'splashscreens/screen-mdpi-portrait.png', // (320x470)
  android_mdpi_landscape: 'splashscreens/screen-mdpi-landscape.png', // (470x320)
  android_hdpi_portrait: 'splashscreens/screen-hdpi-portrait.png', // (480x640)
  android_hdpi_landscape: 'splashscreens/screen-hdpi-landscape.png', // (640x480)
  android_xhdpi_portrait: 'splashscreens/screen-xhdpi-portrait.png', // (720x960)
  android_xhdpi_landscape: 'splashscreens/screen-xhdpi-landscape.png', // (960x720)
  android_xxhdpi_portrait: 'splashscreens/screen-xxhdpi-portrait.png', // (1080x1440)
  android_xxhdpi_landscape: 'splashscreens/screen-xxhdpi-landscape.png', // (1440x1080)
});
App.setPreference('Fullscreen', true);
App.setPreference('StatusBarOverlaysWebView', true);
