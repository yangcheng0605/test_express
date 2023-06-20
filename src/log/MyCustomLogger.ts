import { Logger, QueryRunner } from "typeorm"
import { Logger as Log4jsLogger } from "log4js"
import Logger4jsInstance from "../utils/logger"

/**
 * Message formatting code copy-pasted from typeorm/src/logger/FileLogger
 */
export class MyTypeormLogger implements Logger {
  protected loggerDeleteNode: Log4jsLogger
  protected loggerInsertNode: Log4jsLogger
  protected loggerUpdateNode: Log4jsLogger
  protected loggerSelectNode: Log4jsLogger
  protected logger!: Log4jsLogger
  protected loggerSlow!: Log4jsLogger
  protected loggerError!: Log4jsLogger
  protected loggerDB!: Log4jsLogger
  constructor() {
    this.logger = Logger4jsInstance("query")
    this.loggerSlow = Logger4jsInstance("slowQuery")
    this.loggerError = Logger4jsInstance("errorQuery")
    this.loggerDB= Logger4jsInstance("db")
  }
  public async logQuery(query: string, parameters: any[] | undefined, queryRunner?: QueryRunner) {
    // console.log('查询query：', query)
    // console.log('查询parameters：', parameters)
    // const sql = query + (parameters && parameters.length ?`|${JSON.stringify(parameters)}` : "")
    // if (sql) {
    //   this.loggerDB.info(`[SQL]: ${sql}`)
    // }
  }

  public logQueryError(
    error: string,
    query: string,
    parameters: any[] | undefined
  ) {
    const sql = query + (parameters && parameters.length ? ` -- PARAMETERS: ${JSON.stringify(parameters)}` : "")
    this.loggerError.error(`[FAILED QUERY]: ${sql}`)
    this.loggerError.error(`[QUERY ERROR]: ${error}`)
    this.loggerError.error(`Error:END===========`)
  }

  public logQuerySlow(
    time: number,
    query: string,
    parameters?: any[] | undefined,
  ) {
    const sql = query + (parameters && parameters.length ?`|${JSON.stringify(parameters)}` : "")
    if (time > 1000) {
      this.loggerSlow.debug(`[${time} ms] ${sql}`)
    }
    this.loggerDB.debug(`[${time} ms] ${sql}`)
  }

  public logSchemaBuild(message: string) {
    console.log('logSchemaBuild：',message)
    this.logger.debug(message)
  }

  public logMigration(message: string) {
    console.log('logMigration',message)
    this.logger.info(message)
  }

  public log(level: "log" | "info" | "warn", message: any) {
    console.log('log',message)
    this.logger.log(level, message)
  }
}
