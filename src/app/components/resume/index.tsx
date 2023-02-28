"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import AceEditor from "react-ace";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactHtmlParser from "react-html-parser";
import Head from "next/head";
import Handlebars from "handlebars/dist/handlebars";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import { useLocalStorageState } from "ahooks";
import "ace-builds/src-noconflict/theme-monokai"; // 导入 monokai 主题
import styles from "./index.module.css";
Handlebars.registerHelper("join", function (arr: any) {
  return arr.join(", ");
});
const ThreeColumnLayout = () => {
  const [json, setJson] = useLocalStorageState("json", {
    basics: "123",
  });
  const [css, setCss] = useLocalStorageState<string>("css", "");
  const [template, setTemplate] = useLocalStorageState<string>("html", "");
  const [showHtml, setShowHtml] = useState<string>();
  const Page = styled.div`
    ${css}
  `;
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
        console.log(error);
      }
    }
  };

  useEffect(() => {
    renderHtml();
  }, [template, json]);

  return (
    <div className={styles.container}>
      <div className="h-full flex-1">
        <Tabs style={{ height: "100%" }}>
          <TabList>
            <Tab>HTML</Tab>
            <Tab>CSS</Tab>
            <Tab>JSON</Tab>
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
      <div className="flex-1 overflow-auto h-screen" id="target">
        <Page>{ReactHtmlParser(showHtml ?? "")}</Page>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;
