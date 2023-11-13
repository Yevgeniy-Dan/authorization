import { UserDto } from 'src/app/dtos/user-dto';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from 'src/app/interfaces/assesment.interface';
import {
  IUserCredentials,
  IUserTableEntity,
} from 'src/app/interfaces/user.interface';

export interface IUserState {
  userAssesments: {
    data: IAssesmentResponse[];
    loading: boolean;
  };
  graphData: {
    data: IAssesmentGraphResponse;
    loading: boolean;
  };
  userTableData: {
    data: IUserTableEntity[];
    loading: boolean;
  };
  userCredentials: IUserCredentials;
  user: UserDto;
}

export const initialState: IUserState = {} as IUserState;
