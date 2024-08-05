export interface SearchResponse {
  data:       interfaceSensores[];
  meta:       Meta;
  pagination: Pagination;
}
export interface interfaceSensores {
  messageId:    string;
  deviceId:     string;
  temperature:  number;
  humidity:     number;
  timestamp:    Date;
  año?:          number;
  mes?:          number;
  dia?:          number;
  hora?:         number;
  minuto?:       number;
  segundo?:      number;
  id:           string;
  _rid:         string;
  _self:        string;
  _etag:        string;
  _attachments: string;
  _ts:          number;
}

export interface Pagination {
  total_count: number;
  count:       number;
  offset:      number;
}

export interface Meta {
  status:      number;
  msg:         string;
  response_id: string;
}
