// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /**
   * STRIPE API
   */
  stripeKey: 'pk_live_WyOFBm9pnkQiT6XNT9jrQjUp00reXHLLzf',
  //stripeKey: 'pk_test_OWmj8OkGjUqxLyrgrbHtXR7600FZYXhUa3',

  /**
   * API URL
   */
  //apiURL: 'https://appvirtualrg.com/',
  apiURL: 'https://cocinalaabuela.com/',
  //apiURL: 'http://ringtelbackend.local/',

  /**
   * Chat API URL
   */
  chatApiUrl: 'http://appchatbackend.local/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
