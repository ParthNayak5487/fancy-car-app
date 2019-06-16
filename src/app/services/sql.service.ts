import { Injectable } from '@angular/core';
import { SqlQuery } from './sql-query';
const DB_NAME = 'Fancy Car Database'; // Database name
const win: any = window;

@Injectable({
    providedIn: 'root'
})
export class SqlService {
    private dataBase: any;

    constructor() {
        if (win.sqlitePlugin) {
            this.dataBase = win.sqlitePlugin.openDatabase({
                name: DB_NAME,
                location: 2,
                createFromLocation: 0
            });
        } else {
            console.warn(
                'Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!'
            );

            this.dataBase = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
        }

        this._createTable();
    }

    _createTable() {
        console.log(1);
        this.query(SqlQuery.APP_SETTINGS_CREATE_TABLE).catch(err => {
            console.error(
                'Storage: Unable to create ' +
                SqlQuery.appSettingsTableName +
                ' table',
                err.tx,
                err.err
            );
        });
        this.query(SqlQuery.APP_ORDER_DATA_CREATE_TABLE).catch(err => {
            console.error(
                'Storage: Unable to create ' +
                SqlQuery.appOrderDetailTable +
                ' table',
                err.tx,
                err.err
            );
        });
        this.query(SqlQuery.APP_CAR_DATA_CREATE_TABLE).catch(err => {
            console.error(
                'Storage: Unable to create ' +
                SqlQuery.appCarDataTableName +
                ' table',
                err.tx,
                err.err
            );
        });

        console.log('SQLite db initialized');
    }

    clearDatabase(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.query(SqlQuery.DELETE_ORDER_DATA_TABLE).catch(err => {
                console.error('Storage: Unable to truncate TASK_ACTIVITIES table', err.tx, err.err);
                reject(err);
            });
            this.query(SqlQuery.DELETE_CAR_DATA_TABLE).catch(err => {
                console.error('Storage: Unable to truncate PENDING_SYNC table', err.tx, err.err);
                reject(err);
            });
            this.query(SqlQuery.DELETE_SETTINGS_TABLE).catch(err => {
                console.error('Storage: Unable to truncate PENDING_SYNC table', err.tx, err.err);
                reject(err);
            });
            resolve(true);
        });
    }

    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param  query the query to run
     * @param params the additional params to use for query placeholders
     * @return  that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */

    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.dataBase.transaction(
                    (tx: any) => {
                        tx.executeSql(
                            query,
                            params,
                            // tslint:disable-next-line:no-shadowed-variable
                            (tx: any, res: any) => resolve({ tx, res }),
                            // tslint:disable-next-line:no-shadowed-variable
                            (tx: any, err: any) => reject({ tx, err })
                        );
                    },
                    (err: any) => reject({ err })
                );
            } catch (err) {
                reject({ err });
            }
        });
    }
}

