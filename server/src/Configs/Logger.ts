import chalk from 'chalk';

export default class Logger {
    public static success(content: any): void {
        console.log(chalk.bgGreen.black(content));
    }
    public static error(content: any): void {
        if (content.message) {
            console.log(chalk.bgRed.black(content.message));
        } else {
            console.log(chalk.bgRed.black(content.message));
        }
    }
}
