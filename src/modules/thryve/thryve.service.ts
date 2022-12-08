import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PersonalInformationEntity } from 'src/database/entities/personal-information.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface DynamicValueProps {
  authenticationToken: string;
  partnerUserId: string;
  valueTypes: string;
  dataSources: string;
  detailed: boolean;
  displayTypeName: boolean;
}

interface ProcessDailyDynamicValuesProps extends DynamicValueProps {
  startTimestampUnix: string;
  endTimestampUnix: string;
}

type DailyDynamicValuesBody = Omit<
  ProcessDailyDynamicValuesProps,
  'partnerUserId'
>;

interface DynamicValuesResponseEntry {
  authenticationToken: string;
  partnerUserID: string;
  dataSources: DynamicValuesDataSourceResponseEntry[];
}

interface DynamicValuesDataSourceResponseEntry {
  dataSource: number;
  data: DynamicValuesDataSourceDataResponseEntry[];
}

interface DynamicValuesDataSourceDataResponseEntry {
  createdAt: number;
  details: DailyDynamicValuesDataSourceDataDetailsResponseEntry;
  timestampUnix: number;
  dailyDynamicValueType: number;
  dailyDynamicValueTypeName: string;
  value: string;
  valueType: string;
}

interface DailyDynamicValuesDataSourceDataDetailsResponseEntry {
  timezoneOffset: number;
}

interface ProcessDynamicEpochValuesProps extends DynamicValueProps {
  startTimestampUnix: string;
  endTimestampUnix: string;
}

type DynamicEpochValuesBody = Omit<
  ProcessDailyDynamicValuesProps,
  'partnerUserId'
>;

@Injectable()
export class ThryveService {
  private biomarkers: number[] = [
    6010, 6011, 6012, 6013, 5050, 2000, 2001, 2002, 2003, 1012, 3000, 3100,
    1115, 1114,
  ];

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(PersonalInformationEntity)
    private readonly personalInformationRepository: EntityRepository<PersonalInformationEntity>,
  ) {}

  getValueTypesThatMatchInterest(values: number[]): number[] {
    return this.biomarkers.filter(
      (b) => values.findIndex((v) => v === b) !== -1,
    );
  }

  async toggleWearableConnection(partnerUserId: string, isConnected: string) {
    await this.personalInformationRepository
      .createQueryBuilder()
      .update({ isWearableConnected: isConnected })
      .where({ user: { partnerUserId } })
      .execute();

    return this.findPersonalInformationByPartnerUserId(partnerUserId);
  }

  async processDailyDynamicValues({
    authenticationToken,
    dataSources,
    detailed,
    displayTypeName,
    endTimestampUnix,
    partnerUserId,
    startTimestampUnix,
    valueTypes,
  }: ProcessDailyDynamicValuesProps): Promise<PersonalInformationEntity> {
    const res = await this.getDynamicValuesData<
      DailyDynamicValuesBody,
      DynamicValuesResponseEntry[]
    >('/v5/dailyDynamicValues', {
      authenticationToken,
      valueTypes,
      dataSources,
      detailed,
      displayTypeName,
      startTimestampUnix,
      endTimestampUnix,
    });

    // TODO: Aggregate through data and map on personal information entity
    console.info(res);

    // await this.personalInformationRepository.createQueryBuilder()
    //     .update({ lastMeasurementAt: new Date() })
    //     .where({ user: { partnerUserId } })
    //     .execute()

    // return this.findPersonalInformationByPartnerUserId(partnerUserId);
    return null;
  }

  async processDynamicEpochValues({
    authenticationToken,
    dataSources,
    detailed,
    displayTypeName,
    endTimestampUnix,
    partnerUserId,
    startTimestampUnix,
    valueTypes,
  }: ProcessDynamicEpochValuesProps): Promise<PersonalInformationEntity> {
    const res = await this.getDynamicValuesData<
      DynamicEpochValuesBody,
      DynamicValuesResponseEntry[]
    >('/v5/dynamicEpochValues', {
      authenticationToken,
      dataSources,
      detailed,
      displayTypeName,
      endTimestampUnix,
      startTimestampUnix,
      valueTypes,
    });

    // TODO: Aggregate through data and map on personal information entity
    console.info(res);

    // await this.personalInformationRepository.createQueryBuilder()
    //     .update({ lastMeasurementAt: new Date() })
    //     .where({ user: { partnerUserId } })
    //     .execute()

    // return this.findPersonalInformationByPartnerUserId(partnerUserId);
    return null;
  }

  private async getDynamicValuesData<T, R>(url: string, body: T) {
    const authorization = `Basic ${Buffer.from(
      `${this.configService.get<string>(
        'THRYVE_AUTHORIZATION_USERNAME',
      )}:${this.configService.get<string>('THRYVE_AUTHORIZATION_PASSWORD')}`,
    ).toString('base64')}`;

    const appAuthorization = `Basic ${Buffer.from(
      `${this.configService.get<string>(
        'THRYVE_AUTHORIZATION_APP_ID',
      )}:${this.configService.get<string>('THRYVE_AUTHORIZATION_APP_SECRET')}`,
    ).toString('base64')}`;

    try {
      const res = await axios.post<R>(url, body, {
        baseURL: 'https://api.und-gesund.de',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authorization,
          AppAuthorization: appAuthorization,
          appID: this.configService.get<string>('THRYVE_AUTHORIZATION_APP_ID'),
        },
      });

      return res.data;
    } catch (e) {
      console.error(e);
    }

    return null;
  }

  private findPersonalInformationByPartnerUserId(
    partnerUserId: string,
  ): Promise<PersonalInformationEntity> {
    return this.personalInformationRepository.findOne({
      user: { partnerUserId },
    });
  }
}
