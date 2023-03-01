import { NextApiHandler } from "next";
import puppeteer from "puppeteer";
import moment from "moment";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

async function render(htmlTemplate: string, resume: Record<string, any>) {
  const template = htmlTemplate;

  Handlebars.registerHelper("join", function (arr) {
    return arr.join(", ");
  });

  Handlebars.registerHelper("breaklines", function (text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
    return new Handlebars.SafeString(text);
  });

  Handlebars.registerHelper("getBuildDate", function () {
    return moment().format("MMMM Do YYYY, h:mm:ss a");
  });

  return Handlebars.compile(template)({
    resume: resume,
  });
}

async function buildHTML(
  css: string,
  htmlTemplate: string,
  resume: Record<string, any>
) {
  const filePath = path.join(process.cwd(), "public", "htmlWrapper.hbs");
  const template = fs.readFileSync(filePath, { encoding: "utf-8" });
  const wrapper = Handlebars.compile(template)({
    template: htmlTemplate,
    css,
  });
  // const html = await render(wrapper, resume);
  return wrapper;
}

const Handler: NextApiHandler = async (req, res) => {
  const { css, htmlTemplate, resume } = req.body;

  const html = await buildHTML(css, htmlTemplate, resume);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    format: "A4",
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: "0.4in",
      bottom: "0.4in",
      left: "0.4in",
      right: "0.4in",
    },
  });
  await browser.close();
  res.send(pdf);
};

export default Handler;
