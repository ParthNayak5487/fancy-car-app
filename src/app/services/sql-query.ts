/**  Copyright 2017 Vale S.A.
 *
 * Name - repository.ts
 * Description - Defines Sql queries used to create local DB tables.
 * Created By - Parth Nayak
 * Created On - 2018-JUL-19
 * Updated By -
 * Updated On -
 */

/**
 * Defines Sql queries used to create local DB tables.
 */
export class SqlQuery {


    // Table Names
    public static appSettingsTableName = 'application_settings';
    public static appCarDataTableName = 'application_car_data';
    public static appOrderDetailTable = 'application_order_data';

    public static DELETE_SETTINGS_TABLE: string = 'DELETE FROM ' + SqlQuery.appSettingsTableName;
    public static DELETE_CAR_DATA_TABLE: string = 'DELETE FROM ' + SqlQuery.appCarDataTableName;
    public static DELETE_ORDER_DATA_TABLE: string = 'DELETE FROM ' + SqlQuery.appOrderDetailTable;

    // Create Tables query
    /**
     * Create table script for application master data table.
     */
    public static APP_CAR_DATA_CREATE_TABLE: string = 'CREATE TABLE IF NOT EXISTS ' +
        SqlQuery.appCarDataTableName +
        // tslint:disable-next-line:max-line-length
        ' (dbid INTEGER PRIMARY KEY AUTOINCREMENT, id INTEGER UNIQUE, img TEXT, name TEXT, make TEXT, model TEXT, year INTEGER, available TEXT, price TEXT ) ';


    /**
     * Create table script for application settings table.
     */
    public static APP_SETTINGS_CREATE_TABLE: string = 'CREATE TABLE IF NOT EXISTS ' +
        SqlQuery.appSettingsTableName +
        ' (dbid INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT, theme TEXT)';


    /**
     * Create table script for application local data table.
     */
    public static APP_ORDER_DATA_CREATE_TABLE: string = 'CREATE TABLE IF NOT EXISTS ' +
        SqlQuery.appOrderDetailTable +
        ' (dbid INTEGER PRIMARY KEY AUTOINCREMENT, carData TEXT,  oderNumber TEXT, orderDateTime TEXT)';


    /**
     * ---------------------------------------------------------------------------------------------------------
     */

    /**
     * Settings
     */

    public static INSERT_SETTINGS: string = 'INSERT INTO ' +
        SqlQuery.appSettingsTableName +
        ' (language, theme) values (?,?)';

    public static GET_SETTINGS: string = ' SELECT * FROM ' +
        SqlQuery.appSettingsTableName;



    /**
     * Car Data
     */

    public static INSERT_CAR_DATA: string = 'INSERT INTO ' +
        SqlQuery.appCarDataTableName +
        ' (id , img , name , make , model , year , available, price ) values (?,?,?,?,?,?,?,?)';

    public static GET_CAR_DATA: string = ' SELECT * FROM ' +
        SqlQuery.appCarDataTableName;

    public static GET_CAR_DATA_BY_ID: string = ' SELECT * FROM ' +
        SqlQuery.appCarDataTableName +
        ' WHERE id = ?';

    // Query to get data without any filter 
    public static GET_CAR_DATA_OFFSET: string = ' SELECT * FROM ' +
        SqlQuery.appCarDataTableName
        + ' LIMIT 10 OFFSET {0}';

    // Query to get data with brand name and avaialble filter
    public static GET_CAR_DATA_FILTER_BOTH: string = ' SELECT * FROM ' +
        SqlQuery.appCarDataTableName +
        ' WHERE make = ? AND available = ? ' +
        ' LIMIT 10 OFFSET {0}';


    // Query to get data with brand name
    public static GET_CAR_DATA_FILTER_BRAND: string = ' SELECT * FROM ' +
        SqlQuery.appCarDataTableName +
        ' WHERE make= ?' +
        ' LIMIT 10 OFFSET {0}';

    // Query to get data with brand available
    public static GET_CAR_DATA_FILTER_AVAILABLE: string = ' SELECT * FROM ' +
        SqlQuery.appCarDataTableName +
        ' WHERE available = ? ' +
        ' LIMIT 10 OFFSET {0}';


    public static GET_CAR_DATA_COUNT: string = ' SELECT COUNT(*) FROM ' +
        SqlQuery.appCarDataTableName;

    public static GET_NAME_DISTINCT: string = ' SELECT DISTINCT make FROM ' +
        SqlQuery.appCarDataTableName;


    public static UPDATE_CAR_AVAILABLE: string = 'UPDATE ' +
        SqlQuery.appCarDataTableName +
        ' SET available = ? WHERE id = ?';



    /**
     * Car order details
     */

    public static INSERT_CAR_ORDER_DATA: string = 'INSERT INTO ' +
        SqlQuery.appOrderDetailTable +
        ' (carData,  oderNumber, orderDateTime ) values (?,?,?)';


    public static GET_ORDER_DATA: string = ' SELECT * FROM ' +
        SqlQuery.appOrderDetailTable;

}
