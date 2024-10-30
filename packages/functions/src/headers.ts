/**
 * City of the original client IP as calculated by Vercel Proxy.
 */
export const CITY_HEADER_NAME = 'x-vercel-ip-city';
/**
 * Country of the original client IP as calculated by Vercel Proxy.
 */
export const COUNTRY_HEADER_NAME = 'x-vercel-ip-country';
/**
 * Client IP as calculated by Vercel Proxy.
 */
export const IP_HEADER_NAME = 'x-real-ip';
/**
 * Latitude of the original client IP as calculated by Vercel Proxy.
 */
export const LATITUDE_HEADER_NAME = 'x-vercel-ip-latitude';
/**
 * Longitude of the original client IP as calculated by Vercel Proxy.
 */
export const LONGITUDE_HEADER_NAME = 'x-vercel-ip-longitude';
/**
 * Country region of the original client IP calculated by Vercel Proxy.
 *
 * See [docs](https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-country-region).
 */
export const REGION_HEADER_NAME = 'x-vercel-ip-country-region';
/**
 * The request ID for each request generated by Vercel Proxy.
 */
export const REQUEST_ID_HEADER_NAME = 'x-vercel-id';
/**
 * Unicode characters for emoji flags start at this number, and run up to 127469.
 */
export const EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397;
/**
 * Represents the headers of a request.
 */
export interface Headers {
  get(name: string): string | null;
}
/**
 * We define a new type so this function can be reused with the global `Request`, `node-fetch` and other types.
 */
export interface Request {
  /**
   * Represents the headers of a request.
   */
  headers: Headers;
}
/**
 * The location information of a given request.
 */
export interface Geo {
  /** The city that the request originated from. */
  city?: string;

  /** The country that the request originated from. */
  country?: string;

  /** The flag emoji for the country the request originated from. */
  flag?: string;

  /** The [Vercel Edge Network region](https://vercel.com/docs/concepts/edge-network/regions) that received the request. */
  region?: string;

  /** The region part of the ISO 3166-2 code of the client IP.
   * See [docs](https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-country-region).
   */
  countryRegion?: string;

  /** The latitude of the client. */
  latitude?: string;

  /** The longitude of the client. */
  longitude?: string;
}

function getHeader(headers: Headers, key: string): string | undefined {
  return headers.get(key) ?? undefined;
}

function getHeaderWithDecode(
  request: Request,
  key: string
): string | undefined {
  const header = getHeader(request.headers, key);
  return header ? decodeURIComponent(header) : undefined;
}

/**
 * Converts the 2 digit countryCode into a flag emoji by adding the current character value to the emoji flag unicode starting position. See [Country Code to Flag Emoji](https://dev.to/jorik/country-code-to-flag-emoji-a21) by Jorik Tangelder.
 *
 * @param countryCode The country code returned by: `getHeader(request, COUNTRY_HEADER_NAME)`.
 * @returns A flag emoji or undefined.
 */
function getFlag(countryCode: string | undefined): string | undefined {
  const regex = new RegExp('^[A-Z]{2}$').test(countryCode!);
  if (!countryCode || !regex) return undefined;
  return String.fromCodePoint(
    ...countryCode
      .split('')
      .map(char => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
  );
}

/**
 * Returns the IP address of the request from the headers.
 *
 * @param {(Request|Headers)} input The incoming request object or headers.
 * @returns The IP address of the request.
 *
 * @example
 *
 * ```js
 * import { ipAddress } from '@vercel/functions';
 *
 * export function GET(request) {
 *   const ip = ipAddress(request);
 *   return new Response(`Your IP is ${ip}`);
 * }
 * ```
 *
 */
export function ipAddress(input: Request | Headers): string | undefined {
  const headers = 'headers' in input ? input.headers : input;
  return getHeader(headers, IP_HEADER_NAME);
}

/**
 * Extracts the Vercel Edge Network region name from the request ID.
 *
 * @param requestId The request ID (`x-vercel-id`).
 * @returns The first region received the client request.
 */
function getRegionFromRequestId(requestId?: string): string | undefined {
  if (!requestId) {
    return 'dev1';
  }

  // The request ID is in the format of `region::id` or `region1:region2:...::id`.
  return requestId.split(':')[0];
}

/**
 * Returns the location information for the incoming request.
 * @param request The incoming request object which provides the geolocation data
 * @returns The location information of the request, in this way:
 *
 * ```json
 * {
 *  "city": "New York",
 *  "country": "US",
 *  "flag": "🇺🇸",
 *  "countryRegion": "NY",
 *  "region": "dev1",
 *  "latitude": "40.7128",
 *  "longitude": "-74.0060"
 * }
 * ```
 *
 * @example
 *
 * ```js
 * import { geolocation } from '@vercel/functions';
 *
 * export function GET(request) {
 *   const details = geolocation(request);
 *   return Response.json(details);
 * }
 * ```
 */
export function geolocation(request: Request): Geo {
  return {
    // city name may be encoded to support multi-byte characters
    city: getHeaderWithDecode(request, CITY_HEADER_NAME),
    country: getHeader(request.headers, COUNTRY_HEADER_NAME),
    flag: getFlag(getHeader(request.headers, COUNTRY_HEADER_NAME)),
    countryRegion: getHeader(request.headers, REGION_HEADER_NAME),
    region: getRegionFromRequestId(
      getHeader(request.headers, REQUEST_ID_HEADER_NAME)
    ),
    latitude: getHeader(request.headers, LATITUDE_HEADER_NAME),
    longitude: getHeader(request.headers, LONGITUDE_HEADER_NAME),
  };
}
