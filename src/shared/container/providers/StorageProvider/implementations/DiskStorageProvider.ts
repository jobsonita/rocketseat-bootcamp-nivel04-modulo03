import fs from 'fs'
import path from 'path'

import uploadConfig from '@config/upload'

import IStorageProvider from '../models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpDir, file),
      path.resolve(uploadConfig.disk.uploadsDir, file)
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.disk.uploadsDir, file)

    try {
      await fs.promises.stat(filePath)
    } catch (err) {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
