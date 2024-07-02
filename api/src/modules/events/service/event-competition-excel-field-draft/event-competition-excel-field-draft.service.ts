import { ExcelFieldType } from './../../../../constants/ExcelFieldType';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../../base/BaseService';
import { EventCompetitionExcelFieldDraft } from '../../../../typeorm/entities/EventCompetitionExcelFieldDraft';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UserEventCompetitionsService } from '../../../users/service/user-event-competitions/user-event-competitions.service';
import { CompetitionExcelFieldsService } from '../../../settings/service/competition-excel-fields/competition-excel-fields.service';

@Injectable()
export class EventCompetitionExcelFieldDraftService extends BaseService<EventCompetitionExcelFieldDraft> {
  constructor(
    @InjectRepository(EventCompetitionExcelFieldDraft)
    private eventCompetitionExcelFieldDraft: Repository<EventCompetitionExcelFieldDraft>,
    private userEventCompetitionsService: UserEventCompetitionsService,
    private competitionExcelFieldsService: CompetitionExcelFieldsService,
  ) {
    super(eventCompetitionExcelFieldDraft, {
      userEventCompetition: {
        eventCompetition: true,
      },
      userPet: true,
      userProfile: true,
      competitionExcelField: true,
    });
  }

  async initEventDraftFields(eventId: number): Promise<any> {
    await this.dropDatabaseTable();

    const [userEventCompetitions, _] =
      await this.userEventCompetitionsService.findAll({
        where: {
          event: {
            id: Equal(eventId),
          },
        },
        relations: {
          eventCompetition: {
            competition: true,
          },
          userPet: true,
          userProfile: true,
        },
      });

    // Go through each signed user
    try {
      for (const userEventCompetition of userEventCompetitions) {
        // Go through each signed user
        const [competitionExcelFields, _] =
          await this.competitionExcelFieldsService.findAll({
            where: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              competition: {
                id: Equal(userEventCompetition.eventCompetition.competition.id),
              },
            },
          });
          

        try {
            const payload = competitionExcelFields.map((competitionExcelField) => {
                return {
                  value: '',
                  event: eventId,
                  gradeCard:
                    competitionExcelField.type === ExcelFieldType.GRADE_CARD
                      ? userEventCompetition.eventCompetition.competition.gradeCard
                      : '',
                  userProfile: userEventCompetition.userProfile,
                  userPet: userEventCompetition.userPet,
                  userEventCompetition: userEventCompetition.id,
                  competitionExcelField: competitionExcelField.id,
                };
              });
      
              await this.create(payload);
        } catch(err) {
            console.log(err);
        }
      }
      return 'OK';
    } catch (err) {
      return 'Error' + err.toString();
    }
  }
}
