import { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import puppeteer from "puppeteer";
import schema from "./schema";

/**
 * Generates PDF from given HTML
 * 
 * @param html raw HTML code
 * @returns PDF contents as buffer
 */
const generatePdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMediaType("screen");
  await page.setContent(html);

  const pdf = await page.pdf({
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return pdf;
}

/**
 * Lambda handler method for converting HTML to PDF
 * 
 * @param event event
 * @returns HTTP response
 */
const htmlToPdf: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const pdfData = await generatePdf(event.body.html );

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/pdf"
    },
    body: pdfData.toString("base64"),
    isBase64Encoded: true
  };
};

export const main = middyfy(htmlToPdf);
