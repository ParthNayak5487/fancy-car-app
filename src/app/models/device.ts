export class DeviceData {
    cordova: string;
    /**
     * The device.model returns the name of the device's model or product. The value is set
     * by the device manufacturer and may be different across versions of the same product.
     */
    devicename: string;
    /** Get the device's operating system name. */
    devicetype: string;
    /** Get the device's Universally Unique Identifier (UUID). */
    deviceid: string;
    /** Get the operating system version. */
    firmware: string;
    /** Get the device's manufacturer. */
    manufacturer: string;
    /** Whether the device is running on a simulator. */
    isVirtual: boolean;
    /** Get the device hardware serial number. */
    serial: string;

    hardware: string;

    constructor(data) {
        if (data) {
            this.cordova = data.cordova ? data.cordova : 'test';
            this.devicename = data.model ? data.model : 'test';
            this.devicetype = data.platform ? data.platform : 'test';
            this.deviceid = data.uuid ? data.uuid : 'test';
            this.firmware = data.version ? data.version : 'test';
            this.manufacturer = data.manufacturer ? data.manufacturer : 'test';
            this.isVirtual = data.isVirtual ? data.isVirtual : 'test';
            this.serial = data.serial ? data.serial : 'test';
            this.hardware = '';
        }
    }
}
