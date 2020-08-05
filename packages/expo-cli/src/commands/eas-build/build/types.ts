import { Job } from '@expo/build-tools';
import { ExpoConfig } from '@expo/config';
import { RobotUser, User } from '@expo/xdl';

import { EasConfig } from '../../../easJson';

export interface BuilderContext {
  projectDir: string;
  eas: EasConfig;
  user: User | RobotUser;
  accountName: string;
  projectName: string;
  exp: ExpoConfig;
}

export interface Builder {
  ctx: BuilderContext;
  ensureCredentialsAsync(): Promise<void>;
  configureProjectAsync(): Promise<void>;
  prepareJobAsync(archiveUrl: string): Promise<Job>;
}
