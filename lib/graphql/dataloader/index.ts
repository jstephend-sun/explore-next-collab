export * from './user';
export * from './comment';

export enum OrderBy {
  ID_DESC,
  ID_ASC,
}

interface WithId {
  id: string | number;
}

export function sort<G extends WithId>(arr: G[], orderBy: string): G[] {
  return arr.sort((a, b) => {
    return OrderBy[orderBy] === OrderBy.ID_ASC
      ? parseInt(a.id.toString()) - parseInt(b.id.toString())
      : parseInt(b.id.toString()) - parseInt(a.id.toString());
  });
}
