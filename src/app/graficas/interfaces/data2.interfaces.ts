
export interface SearchResponse {
  data:       interfaceSensores[];
  meta:       Meta;
  pagination: Pagination;
}
export interface interfaceSensores {
  messageId:             string;
  deviceId:              DeviceID;
  temperature:           number;
  humidity:              number;
  EventProcessedUtcTime: Date;
  PartitionId:           number;
  EventEnqueuedUtcTime:  Date;
  adjustedEventTime:     Date;
  IoTHub:                IoTHub;
  id:                    string;
  _rid:                  string;
  _self:                 string;
  _etag:                 string;
  _attachments:          Attachments;
  _ts:                   number;
}

export interface IoTHub {
  MessageId:                    null;
  CorrelationId:                null;
  ConnectionDeviceId:           ConnectionDeviceID;
  ConnectionDeviceGenerationId: string;
  EnqueuedTime:                 Date;
  StreamId:                     null;
}

export enum ConnectionDeviceID {
  DispositivoRaspberry = "dispositivoRaspberry",
}

export enum Attachments {
  Attachments = "attachments/",
}

export enum DeviceID {
  RaspberryPiWebClient = "Raspberry Pi Web Client",
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
