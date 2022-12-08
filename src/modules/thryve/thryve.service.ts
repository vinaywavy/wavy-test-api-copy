import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PersonalInformationEntity } from 'src/database/entities/personal-information.entity';
import { DailyDynamicValues, DynamicEpochValues } from './event-trigger.dto';
import { ConfigService } from '@nestjs/config';

interface DynamicValueProps {
  authenticationToken: string;
  partnerUserId: string;
  valueTypes: string;
  dataSources: string;
  detailed: boolean;
  displayTypeName: boolean;
}

interface ProcessDailyDynamicValuesProps extends DynamicValueProps {
  startTimestamp: string;
  endTimestamp: string;
}

type DailyDynamicValuesBody = Omit<
  ProcessDailyDynamicValuesProps,
  'partnerUserId'
>;

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
  private baseUrl = 'https://api.und-gesund.de';
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
    console.info(values);
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
    endTimestamp,
    partnerUserId,
    startTimestamp,
    valueTypes,
  }: ProcessDailyDynamicValuesProps): Promise<PersonalInformationEntity> {
    const res = await this.getDynamicValuesData<DailyDynamicValuesBody>(
      '/v5/dailyDynamicValues',
      {
        authenticationToken,
        valueTypes,
        dataSources,
        detailed,
        displayTypeName,
        startTimestamp,
        endTimestamp,
      },
    );

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
    const res = this.getDynamicValuesData('/v5/dynamicEpochValues', {
      authenticationToken,
      dataSources,
      detailed,
      displayTypeName,
      endTimestampUnix,
      startTimestampUnix,
      valueTypes,
    });

    console.info(res);

    // await this.personalInformationRepository.createQueryBuilder()
    //     .update({ lastMeasurementAt: new Date() })
    //     .where({ user: { partnerUserId } })
    //     .execute()

    // return this.findPersonalInformationByPartnerUserId(partnerUserId);
    return null;
  }

  private async getDynamicValuesData<T>(url: string, body: T) {
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

    console.log({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: authorization,
      AppAuthorization: appAuthorization,
      appID: this.configService.get<string>('THRYVE_AUTHORIZATION_APP_ID'),
    });
    console.log(body);

    try {
      const res = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authorization,
          AppAuthorization: appAuthorization,
          appID: this.configService.get<string>('THRYVE_AUTHORIZATION_APP_ID'),
        },
        body: JSON.stringify(body),
      });
      console.log(res);
      console.log(await res.text());
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
