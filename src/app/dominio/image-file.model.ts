import {BaseResourceModel} from "./base-resource.model";

export class ImageFile extends BaseResourceModel{

  constructor(
    public idImage?: string,
    public dsImageType?: string,
    public nmImage?: string,
    public file?:  Blob[],
  ) {
    super()
  }



  static fromJson(jsonData: any): ImageFile {
    return Object.assign(new ImageFile(), jsonData);
  }

  public getId() {
    return this.idImage;
  }

}
