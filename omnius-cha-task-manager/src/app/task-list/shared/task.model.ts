export class Task {
  constructor(
    public uuid: string,
    public title: string,
    public description: string,
    public priority: string,
    public status: string,
    public createdat: number,
    public updatedat: number,
    public resolvedat: number,
    public postponedat: number,
    public postponedtime: number,
    public duedate: number

  ) {}
}
