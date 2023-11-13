export interface IAssesmentResponse {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface IAssesmentGraphResponse {
  data: {
    agreeableness: number;
    drive: number;
    luck: number;
    openness: number;
  };
  type: string;
}
