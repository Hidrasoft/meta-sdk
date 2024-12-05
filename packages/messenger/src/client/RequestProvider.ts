import { RequestOptions, RequestData } from "../interfaces/RequestInterfaces";

export class RequestProvider {

  private static requestOptions: RequestOptions = {
    url: 'https://graph.facebook.com/v3.1/',
    qs: {
      access_token: undefined,
    },
    method: undefined,
  };

  /* istanbul ignore next line */
  private constructor() {}

  public static getRequestOptions(): RequestOptions {
    return <RequestOptions>JSON.parse(JSON.stringify(RequestProvider.requestOptions));
  }

  public static sendMessage(options: RequestOptions, requestData: RequestData, cb?: Function) {
    options.qs.access_token = requestData.token;

    if (requestData.hasOwnProperty('proxy')) {
      options.proxy = requestData.proxy;
    }

    if (typeof cb !== 'function') {
      return new Promise((resolve, reject) => {
        request(options, (err, _res, body) => {
          if (err) {
            reject(err);
          } else {
            if (!((typeof body === 'object' && !Array.isArray(body) && body !== null))) {
              const bodyObject = JSON.parse(body);
              if (bodyObject.error) {
                reject(bodyObject.error.message);
              } else {
                resolve(bodyObject);
              }
            } else {
              resolve(body);
            }
          }
        });
      });
      // tslint:disable-next-line
    } else {
      request(options, (err, _res, body) => {
        if (err) return cb(err);
        if (body.error) return cb(body.error);
        cb(null, body);
      });
      return Promise.resolve();
    }
  }

  public static getProxyData(requestData: RequestData, proxyData?: ProxyData) {
    if (proxyData) {
      if (Object.prototype.toString.call(proxyData) === '[object Object]'
        && proxyData.hasOwnProperty('hostname')
        && proxyData.hasOwnProperty('port')) {
        if (proxyData.hostname.indexOf('http') === 0) {
          requestData.proxy = `${proxyData.hostname}:${proxyData.port}`;
        } else {
          requestData.proxy = `http://${proxyData.hostname}:${proxyData.port}`;
        }
      } else {
        throw new Error('Invalid Proxy object given, expected hostname and port');
      }
    }
    return requestData;
  }
}