
export interface RequestOptions {
  url: string;
  qs: {
    access_token?: string,
    fields?: string,
  };
  method?: string;
  proxy?: Object;
  // json?: PageSettings | PagePost | ClientMessage;
}

export interface RequestData {
  token: string;
  proxy?: string;
}