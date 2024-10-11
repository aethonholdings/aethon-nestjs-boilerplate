export namespace Composer {
    export function log(event: string, message: string): string {
        message = message.replace(/\n/g, " ").replace(/\s+/g, " ");
        return `${event}: ${message}`;
    }
}
