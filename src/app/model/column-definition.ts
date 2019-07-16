export interface IColumnDefinition {
  field: string;
  header: string;
  childColumns?: IColumnDefinition[];
}

export class ColumnDefinition implements IColumnDefinition {
  constructor(
    private _field: string,
    private _header: string,
    private _childColumns?: ColumnDefinition[]
  ) {
  }

  get field(): string {
    return this._field;
  }

  set field(value: string) {
    this._field = value;
  }

  get header(): string {
    return this._header;
  }

  set header(value: string) {
    this._header = value;
  }

  get childColumns(): ColumnDefinition[] {
    return this._childColumns;
  }

  set childColumns(value: ColumnDefinition[]) {
    this._childColumns = value;
  }
}
