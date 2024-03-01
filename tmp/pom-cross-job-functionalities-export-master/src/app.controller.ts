import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private readonly appService: AppService) { }

  @Get('/liveness')
  async getLiveness(): Promise<any> {
    return { status: 'ok' };
  }

  @Get('/v1/pom/cross/functionalities-export/health')
  async getHealth(): Promise<any> {
    return this.appService.health();
  }

  @Post('/v1/pom/cross/functionalities-export')
  async postJob(): Promise<any> {
    console.log('----- Request start -----\n');

    const colFunctionalityName = 'pom_cross_functionality_management_functionalities';
    const colChannelName = 'pom_cross_channel_management_channels';

    // Connecting db
    console.log('Connecting to DB...');
    await this.appService.connectDb();
    console.log('Connected to DB\n');

    // Set default values for testing purposes
    let colFunctionality: any = { data: 'default' };
    let colChannel: any = { data: 'default' };

    // Consulting db
    console.log('Consulting DB...')
    colFunctionality = await this.appService.getCacheValue(colFunctionalityName, async () =>
      this.formatFunctionalities(await this.appService.consult(colFunctionalityName)));
    colChannel = await this.appService.getCacheValue(colChannelName, async () =>
      this.formatChannels(await this.appService.consult(colChannelName)));
    console.log('Consulted\n');

    const FTP_DISABLED = this.configService.get('FTP_DISABLED');
    const FILES_EXT = this.configService.get('FILES_EXTENSSION');

    let prom1: Promise<any>;
    let prom2: Promise<any>;

    if (FTP_DISABLED !== 'true') {
      const FTP_FILES_PATH = this.configService.get('FTP_FILES_PATH');

      // Buffering
      console.log('Buffering local files...');
      let buffer1 = Buffer.from(this.formatFile(colFunctionality, FILES_EXT), 'utf8');
      let buffer2 = Buffer.from(this.formatFile(colChannel, FILES_EXT), 'utf8');
      console.log('Buffered\n');

      // Connecting ftp
      console.log('Connecting FTP client...');
      await this.appService.connectFtp();
      console.log('Connected to FTP\n');

      // Writing ftp
      console.log('Writing ftp files...');
      prom1 = this.appService.put(buffer1, `${FTP_FILES_PATH}/${colFunctionalityName}.${FILES_EXT}`);
      prom2 = this.appService.put(buffer2, `${FTP_FILES_PATH}/${colChannelName}.${FILES_EXT}`);
    }
    else {
      const FILES_PATH = this.configService.get('FILES_PATH');

      console.log('Writing files...');
      prom1 = this.appService.saveFile(`${FILES_PATH}/${colFunctionalityName}.${FILES_EXT}`, this.formatFile(colFunctionality, FILES_EXT))
      prom2 = this.appService.saveFile(`${FILES_PATH}/${colChannelName}.${FILES_EXT}`, this.formatFile(colChannel, FILES_EXT))
    }

    await Promise.all([prom1, prom2])
    console.log('Writed\n');

    console.log('----- Request end -----');

    return { message: 'ok' };
  }

  formatFile(data, format) {
    if (format == 'csv') {
      let _cols = data.length > 0 ? Object.keys(data[0]) : [];
      let _data = data.map(m => _cols.map(p => m[p]).join(';'));
      return [_cols.join(';')].concat(_data).join('\n');
    }

    return JSON.stringify(data);
  }

  formatFunctionalities(data) {
    return data.map(m => ({
      id_functionality: m.id_functionality,
      description: m.description,
      enabled: m.enabled,
      created_date: m.created_date,
      id_parent_functionality: m.id_parent_functionality,
      last_modified_date: m.last_modified_date
    }));
  }

  formatChannels(data) {
    return data.map(m => ({
      id_channel: m.id_channel,
      description: m.description,
      created_date: m.created_date,
      last_modified_date: m.last_modified_date
    }));
  }
}
