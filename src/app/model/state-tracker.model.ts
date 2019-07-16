class Moment {
}

export interface IStateTracker {
    id?: number;
    addTime?: Moment;
    deleteTime?: Moment;
    deleted?: boolean;
    myUserId?: number;
}

export class StateTracker implements IStateTracker {
    constructor(
        public id?: number,
        public addTime?: Moment,
        public deleteTime?: Moment,
        public deleted?: boolean,
        public myUserId?: number
    ) {
        this.deleted = this.deleted || false;
    }
}
