import { Status } from './Status'

export type Story = {
  id: string;
  value: number | null;
  points: number | null;
  status: Status;
  title: string;
}
