import { Context } from 'koa';

import { IS_SHOW_LOG, CODE_SUCCESS, OVERALL_ERROR_EVENT, E_LOG_LEVEL } from './constants';
import { i18n_error_en_AU } from './errors';

const printLog = (s: string, level: E_LOG_LEVEL = E_LOG_LEVEL.log) => {
  if (!IS_SHOW_LOG) {
    return;
  }

  switch (level) {
    case E_LOG_LEVEL.log:
      console.log(s);
      break;
    case E_LOG_LEVEL.warn:
      console.warn(s);
      break;
    case E_LOG_LEVEL.error:
      console.error(s);
      break;
    default:
      console.info(s);
  }
};

export const log = (s: string) => {
  printLog(s, E_LOG_LEVEL.log);
};

export const warn = (s: string) => {
  printLog(s, E_LOG_LEVEL.warn);
};

export const error = (s: string) => {
  printLog(s, E_LOG_LEVEL.error);
};

export const info = (...p: any[]) => {
  console.info(p);
};

export const printTSError = (e: unknown) => {
  if (typeof e === 'object') {
    printLog((e as Error).stack as string, E_LOG_LEVEL.error);
  } else {
    printLog(String(e), E_LOG_LEVEL.error);
  }
};

export const isUndefined = (val: any) => val === undefined;

export const isNull = (val: any) => val === null;

export const isFunction = (val: any) => typeof val === 'function';

export const isEmptyString = (s: string | undefined | null) => !(s !== undefined && s !== null && s !== '');

export const isEmptyArray = (arr: Array<any>) => !(arr && arr.length > 0);

export const getI18NError = (errorCode: string) => {
  if (errorCode === CODE_SUCCESS) {
    return '';
  }

  if (isEmptyString(errorCode)) {
    return `${i18n_error_en_AU.errors.get('1000')} (code: 1000)`;
  }

  const text = i18n_error_en_AU.errors.get(errorCode.startsWith('2') ? '1000' : errorCode);
  if (isEmptyString(text)) {
    return `${i18n_error_en_AU.errors.get('1000')} (code: ${errorCode})`;
  } else {
    return `${text} (code: ${errorCode})`;
  }
};

export const isValidatedEmail = (email: string) => {
  return !isEmptyString(email) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

interface IAPIResponse {
  code: string; // 0: success, others: error
  message: string;
  data: any;
}

type APIResponse = IAPIResponse;

export const generateResp = (errorCode: string, data?: any): APIResponse => {
  return {
    code: errorCode,
    message: getI18NError(errorCode),
    data,
  };
};

export const emitError = (ctx: Context, errorCode: string, e?: Error | unknown) => {
  error(errorCode);

  if (e) {
    printTSError(e);
  }

  ctx.app.emit(OVERALL_ERROR_EVENT, errorCode, ctx);
};
