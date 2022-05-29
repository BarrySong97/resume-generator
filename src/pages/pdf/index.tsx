import React, { useEffect, useRef } from 'react';

import { jsPDF } from 'jspdf';

const doc = new jsPDF();
doc.text('Hello world!', 10, 10);
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
