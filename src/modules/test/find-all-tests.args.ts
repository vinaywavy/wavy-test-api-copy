import { ArgsType } from '@nestjs/graphql';
import { FindArgs } from 'src/common/dto/find.args';

@ArgsType()
export class FindAllTestsArgs extends FindArgs {}
