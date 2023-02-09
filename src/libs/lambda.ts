import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

/**
 * Helper function for middifying handlers
 * 
 * @param handler handler
 * @returns middified handler
 */
export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser())
}
