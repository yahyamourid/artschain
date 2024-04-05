import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
  return (
    <div className=''>
      <QRCode value={url} />
    </div>
  );
};

export default QRCodeGenerator;
