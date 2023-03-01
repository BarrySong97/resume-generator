"use client";
import { memo, useState, useEffect, useRef, ReactNode } from "react";
import axios from "axios";
import AceEditor from "react-ace";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactHtmlParser from "react-html-parser";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import Handlebars from "handlebars/dist/handlebars";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import { useLocalStorageState } from "ahooks";
import { ToastContainer, toast } from "react-toastify";
import "ace-builds/src-noconflict/theme-monokai"; // 导入 monokai 主题
import styles from "./index.module.css";
import { VscodeIconsFileTypeLightJson } from "@/assets/icon/Json";
import { VscodeIconsFileTypeCss } from "@/assets/icon/css";
import { VscodeIconsFileTypeHtml } from "@/assets/icon/html";
Handlebars.registerHelper("join", function (arr: any) {
  return arr.join(", ");
});
const Page = memo(styled.div`
  ${(props: any) => props.cssString}
`);
const warn = (msg: string) => {
  toast.warn(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const ThreeColumnLayout = () => {
  const [json, setJson] = useLocalStorageState("json", {
    basics: "123",
  });
  const [css, setCss] = useLocalStorageState<string>("css", "");
  const [template, setTemplate] = useLocalStorageState<string>("html", "");
  const [showHtml, setShowHtml] = useState<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 在客户端运行的代码
      // 标记此组件为客户端组件
      window.__NEXT_USE_CLIENT__ = true;
    }
  }, []);

  const renderHtml = () => {
    if (json && template) {
      const data = JSON.parse(json);
      // const template = "<h1>{{title}}</h1><p>{{content}}</p>";

      try {
        const compiledTemplate = Handlebars.compile(template);

        const html = compiledTemplate(data);

        setShowHtml(html);
      } catch (error) {
        warn("语法错误，请检查输入内容");
      }
    }
  };

  useEffect(() => {
    renderHtml();
  }, [template, json]);

  const downloadPdf = async () => {
    const response = await axios.post("/api/pdf", {
      css,
      htmlTemplate: showHtml,
      resume: JSON.parse(json),
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={`h-full flex-1 ${styles.editor}`}>
        <Tabs style={{ height: "100%" }}>
          <TabList>
            <Tab>
              <div className="flex items-center justify-center">
                <VscodeIconsFileTypeHtml className="mr-2" />
                HTML
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center justify-center">
                <VscodeIconsFileTypeCss className="mr-2" />
                CSS
              </div>
            </Tab>
            <Tab>
              <div className="flex items-center justify-center">
                <VscodeIconsFileTypeLightJson className="mr-2" />
                JSON
              </div>
            </Tab>
          </TabList>
          <TabPanel style={{ height: "calc(100% - 48px)" }}>
            {/* HTML 模板编辑器 */}
            <AceEditor
              mode="html"
              theme="monokai"
              name="html-editor"
              value={template}
              width="100%"
              height="100%"
              // style={{ backgroundColor: "#272822" }}
              editorProps={{ $blockScrolling: true }}
              onChange={(value) => setTemplate(value)}
            />
          </TabPanel>
          <TabPanel style={{ height: "calc(100% - 48px)" }}>
            {/* CSS 编辑器 */}
            <AceEditor
              mode="css"
              theme="monokai"
              name="css-editor"
              value={css}
              width="100%"
              height="100%"
              editorProps={{ $blockScrolling: true }}
              onChange={(value) => setCss(value)}
            />
          </TabPanel>
          <TabPanel style={{ height: "calc(100% - 48px)" }}>
            {/* JSON 编辑器 */}
            <AceEditor
              mode="json"
              theme="monokai"
              name="json-editor"
              value={json as string}
              width="100%"
              height="100%"
              editorProps={{ $blockScrolling: true }}
              onChange={(value) => setJson(value)}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="flex-1 overflow-auto h-screen py-8" id="target">
        <button onClick={downloadPdf}>download</button>
        <Page cssString={css}>{ReactHtmlParser(showHtml ?? "")}</Page>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ThreeColumnLayout;
