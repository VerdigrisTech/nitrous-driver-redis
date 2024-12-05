/**
 * @packageDocumentation
 * @module @verdigris/nitrous/drivers
 */

import { Driver } from "@verdigris/nitrous";
import { RedisClientType, RedisClientOptions, createClient } from "redis";

export default class Redis extends Driver {
  private _client: RedisClientType;
  private _options: RedisClientOptions;

  public constructor(options?: RedisClientOptions) {
    super();
    this._options = options;
  }

  /**
   * Lazy loads underlying Redis client. This ensures users don't get a module
   * not found error when importing this library without installing the redis
   * package.
   */
  public get client(): RedisClientType {
    if (!this._client) {
      this._client = createClient(this._options) as RedisClientType;
      this._client.connect();
    }

    return this._client;
  }

  private _ping(): Promise<string> {
    return this.client.ping.bind(this.client)();
  }

  private _keys(pattern: string): Promise<string[]> {
    return this.client.keys.bind(this.client)(pattern);
  }

  private _exists(...keys: string[]): Promise<number> {
    return this.client.exists.bind(this.client)(...keys);
  }

  private _get(key: string): Promise<string> {
    return this.client.get.bind(this.client)(key);
  }

  private _set(key: string, value: string): Promise<"OK"> {
    return this.client.set.bind(this.client)(key, value);
  }

  private _setex(key: string, seconds: number, value: string): Promise<string> {
    return this.client.setEx.bind(this.client)(key, seconds, value);
  }

  private _ttl(key: string): Promise<number> {
    return this.client.ttl.bind(this.client)(key);
  }

  private _expire(key: string, seconds: number): Promise<number> {
    return this.client.expire.bind(this.client)(key, seconds);
  }

  private _delete(keys: string | string[]): Promise<number> {
    return this.client.del.bind(this.client)(keys);
  }

  public get isClosed(): boolean {
    return !this.client.isOpen;
  }

  public async isConnected(): Promise<boolean> {
    try {
      return !this.isClosed && (await this._ping()) === "PONG";
    } catch {
      return false;
    }
  }

  public async keys(): Promise<string[]> {
    return await this._keys("*");
  }

  public async has(key: string): Promise<boolean> {
    return (await this._exists(key)) > 0;
  }

  public async get(key: string): Promise<string> {
    return await this._get(key);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public async set(key: string, value: any, ttl?: number): Promise<boolean> {
    return (
      (ttl == null
        ? await this._set(key, value)
        : await this._setex(key, ttl, value)) === "OK"
    );
  }

  public async ttl(key: string): Promise<number> {
    return await this._ttl(key);
  }

  public async expire(key: string, ttl: number): Promise<boolean> {
    return (await this._expire(key, ttl)) === 1;
  }

  public async delete(keys: string | string[]): Promise<number> {
    return await this._delete(keys);
  }

  public async close(): Promise<boolean> {
    const quit = this.client.quit.bind(this.client);
    return (await quit()) === "OK";
  }
}
