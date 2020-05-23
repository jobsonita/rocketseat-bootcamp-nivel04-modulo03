import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

export type StorageDriver = 'disk' | 's3'

function getStorageDriver(): StorageDriver {
  const driver = process.env.STORAGE_DRIVER?.trim()
  if (driver === 'disk' || driver === 's3') {
    return driver
  }
  throw new Error('Invalid STORAGE_DRIVER on .env file, use "disk" or "s3".')
}

const tmpDir = path.resolve(__dirname, '..', '..', 'tmp')

const s3_bucket = process.env.STORAGE_S3_BUCKET as string

export default {
  driver: getStorageDriver(),

  tmpDir,

  multer: {
    storage: multer.diskStorage({
      destination: tmpDir,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      },
    }),
  },

  disk: {
    uploadsDir: path.resolve(tmpDir, 'uploads'),
  },

  s3: {
    bucket: s3_bucket,
    base_url: `https://${s3_bucket}.s3.amazonaws.com`,
  },
}
