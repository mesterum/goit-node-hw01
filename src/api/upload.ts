import createError from 'http-errors';
import express, { type Router } from 'express';
import path from 'path';
import crypto from 'crypto'

import fs from 'node:fs/promises';
const app = express();
import multer from 'multer';
import { auth } from './auth.js';
import Jimp from 'jimp';
import type { User } from '../service/schemas/user.js';
import type { DocumentType } from '@typegoose/typegoose';

const publicDir = path.join(__dirname, 'public');
const uploadDir = path.join(publicDir, 'avatars');
fs.mkdir(uploadDir, { recursive: true });

const storage = multer.diskStorage({/* 
  destination: (req, file, cb)) => {
    cb(null, uploadDir);
  }, */
  filename: (_req, file, cb) => {
    crypto.randomBytes(12, function (err, raw) {
      // https://b64encode.com/blog/base64url-guide/
      cb(err, raw.toString('base64url'))// + path.extname(file.originalname)
    })
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 0x500000,// 5 MB
    files: 1,
  },
});

export function setAvatarRoute(router: Router) {
  router.patch('/avatars', upload.single('avatar'), auth, async (req, res, next) => {
    if (!req.file) {
      return next(createError(400, 'No file uploaded'));
    }
    const { path: temporaryName, filename } = req.file;
    const savePath = path.join(uploadDir, filename + '.jpg');
    const avatarURL = path.join("/avatars", filename + '.jpg');
    const user = req.user as DocumentType<User>;
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      (await Jimp.read(temporaryName))
        .resize(250, 250) // resize
        .quality(70) // set JPEG quality
        .writeAsync(savePath); // save
      if (user.avatarURL?.startsWith("/avatars/"))
        // remove the old avatar
        fs.unlink(path.join(publicDir, user.avatarURL));
      user.avatarURL = avatarURL;
      user.save();
      res.json({ avatarURL });
    } catch (err) {
      return next(err);
    } finally {
      await fs.unlink(temporaryName);
    }
  });
}

