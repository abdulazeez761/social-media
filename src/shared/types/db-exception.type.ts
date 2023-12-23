import { DbExceptionI } from 'shared/interfaces/general/exception-for-db.interface';
import { ExceptionI } from 'shared/interfaces/http/exception.interface';

export type DbException = ExceptionI & DbExceptionI;
