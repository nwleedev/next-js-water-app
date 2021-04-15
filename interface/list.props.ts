import { Dispatch, SetStateAction } from 'react';
import { IListItem } from './list.item';

export interface IListProps {
  list: IListItem[];
  setList: Dispatch<SetStateAction<IListItem[]>>;
}
