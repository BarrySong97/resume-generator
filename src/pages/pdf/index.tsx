import React, { useEffect, useRef } from 'react';

import { jsPDF } from 'jspdf';

const doc = new jsPDF();
doc.addFont(
  'https://uploads.codesandbox.io/uploads/user/ba52a0ec-966b-4dc8-95f0-656522f54d2b/w8Dn-msyahei.ttf',
  'msyahei',
  'normal'
);
doc.setFont('msyahei', 'normal');

export default function Pdf() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    doc.html(ref.current, {
      callback: function (doc) {
        doc.save();
      },
      x: 10,
      y: 10
    });
  }, []);
  return <div ref={ref}></div>;
}
