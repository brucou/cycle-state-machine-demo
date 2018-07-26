import { ActionResponse, Request } from '../components/types';
export type Context = string;
export type ActionResult = any;
export interface DomainActionResponse {
  request: Request | null,
  err: Error | null;
  response: ActionResponse;
}
export type Repository = any;
export type Payload = any;
export interface DomainActionHandler {
  (repository: Repository, context: Context, payload: Payload): any;
}
export interface CommandMap {
  [command: string]: DomainActionHandler;
}
export interface ContextCommandMap {
  [context: string]: CommandMap;
}
export interface DomainAction {
  context: Context;
  command: string;
  payload: Payload;
}
export interface QueryHandler {
  (repository: Repository, context: Context, payload: Payload): any;
}
export interface ContextMap {
  [context: string]: QueryHandler;
}
export interface HashMap<T> {
  [context: string]: T;
}
