export interface IDocument {
    id?: number;
    fileContentType?: string;
    file?: any;
    fileName?: string;
    title?: string;
    description?: string;
    errandId?: number;
    createdById?: number;
    stateDetailsId?: number;
    userId?: number;
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public fileContentType?: string,
        public file?: any,
        public fileName?: string,
        public title?: string,
        public description?: string,
        public errandId?: number,
        public createdById?: number,
        public stateDetailsId?: number,
        public userId?: number
    ) {}

    public static fromJson(jsonObject: any): Document {
      return new Document(
        jsonObject.id,
        jsonObject.fileContentType,
        jsonObject.file,
        jsonObject.fileName,
        jsonObject.title,
        jsonObject.description,
        jsonObject.errandId,
        jsonObject.createdById,
        jsonObject.stateDetailsId,
        jsonObject.userId
      )
    }

    public toJson(): any {
      return {
        id: this.id,
        fileContentType: this.fileContentType,
        file: this.file,
        fileName: this.fileName,
        title: this.title,
        description: this.description,
        errandId: this.errandId,
        createdById: this.createdById,
        stateDetailsId: this.stateDetailsId,
        userId: this.userId
      }
    }

}
