import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as NodeCache from 'node-cache';
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import * as PromiseFtp from 'promise-ftp';
import { promises as fs } from 'fs';

const MONGO_URI_TEMPLATE = 'mongodb://{/user}:{/pass}@{/host}:{/port}?authSource={/db}&readPreference=primary&ssl=false';

@Injectable()
export class AppService {

  dbName: string;
  dbUri: string;
  cache: NodeCache;
  db: Db;

  // ftpPort: string;
  ftpHost: string;
  ftpUser: string;
  ftpPass: string;
  ftp: PromiseFtp;

  constructor(private configService: ConfigService) {
    // Database
    this.dbName = this.configService.get('MONGO_DATABASE');
    this.dbUri = MONGO_URI_TEMPLATE
      .replace('{/user}', encodeURIComponent(this.configService.get('MONGO_USUARIO')))
      .replace('{/pass}', encodeURIComponent(this.configService.get('MONGO_PASSWORD')))
      .replace('{/host}', this.configService.get('MONGO_HOST'))
      .replace('{/port}', this.configService.get('MONGO_PORT'))
      .replace('{/db}', this.dbName);

    // FTP
    //this.ftpPort = this.configService.get('FTP_PORT');
    this.ftpHost = this.configService.get('FTP_HOST');
    this.ftpUser = this.configService.get('FTP_USUARIO');
    this.ftpPass = this.configService.get('FTP_PASSWORD');

    const CACHE_PERIOD = this.configService.get('CACHE_PERIOD');
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: CACHE_PERIOD });
  }

  async health() {
    let status: string = 'Healthy';

    try {
      await this.connectDb();
      await this.connectFtp();
    }
    catch (ex) {
      console.error(ex);
      status = 'Unhealthy';
    }

    return { status: status };
  }

  async connectDb(): Promise<any> {
    // console.log(this.dbUri);
    const client = await MongoClient.connect(this.dbUri, { useUnifiedTopology: true } as MongoClientOptions);

    this.db = client.db(this.dbName);
  }

  async connectFtp(): Promise<any> {
    this.ftp = new PromiseFtp();

    await this.ftp.connect({ host: this.ftpHost, user: this.ftpUser, password: this.ftpPass });
  }

  async consult(collection) {
    console.log('consulting ' + collection + '...');
    return this.db.collection(collection).find({}).toArray();
  }

  put(from, to): Promise<any> {
    return this.ftp.put(from, to);
  }

  saveFile(to: string, content: string): Promise<any> {
    return fs.writeFile(to, content, 'utf8');
  }

  getCacheValue(name, getter) {
    var data = this.cache.get(name);

    if (!data) {
      data = getter();
      this.cache.set(name, data);
    }

    return data;
  }
}
