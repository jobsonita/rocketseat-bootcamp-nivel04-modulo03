import aws, { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import path from 'path'

import uploadConfig from '@config/upload'

import IStorageProvider from '../models/IStorageProvider'

export default class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3()
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpDir, file)

    const fileType = mime.getType(originalPath)

    if (!fileType) {
      throw new Error(`Unkown content type for file ${file}.`)
    }

    const fileContent = await fs.promises.readFile(originalPath)

    await this.client
      .putObject({
        Bucket: uploadConfig.s3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: fileType,
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.s3.bucket,
        Key: file,
      })
      .promise()
  }
}
